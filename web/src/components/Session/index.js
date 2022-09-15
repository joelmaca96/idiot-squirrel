import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import React from 'react';
import withNavigateHook, * as ROUTES from '../../constants/routes';

//Componente para controlar el estado de la autenticacón
//High-order component para no tener que andar exportando el contexto
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

//Componente para controlar la autorizacion del un usuario autenticado
//Se le debe pasar una condicion para la autorizacion y un componente que sera el que se muestre
//si se cumple la condicion.
const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.navigation(ROUTES.SIGN_IN, { replace: true });
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withNavigateHook(withFirebase(WithAuthorization));
};

export { AuthUserContext, withAuthentication, withAuthorization };
