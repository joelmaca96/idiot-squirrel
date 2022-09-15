import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import withNavigateHook, * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import { Button } from 'react-bootstrap';
import '../../common/style.css';

const HomePage = () => (
  <div className='centered-full-col'>
    <HomeForm />
  </div>
);

class HomePageBase extends Component {

  onSignOut = () => {
    this.props.firebase.doSignOut();
    this.props.navigation(ROUTES.SIGN_IN, { replace: true });
  };

  render() {
    return (
      <div className='centered-full-col'>
        <Button variant='secondary' type='submit' onClick={this.onSignOut}>
          Cerrar sesión
        </Button>
      </div>
    );
  }
}

//Condicion para mostrar la pagina, sencillamente cualquier usuario 
//autenticado puede verla
const condition = authUser => !!authUser;

const HomeForm = withNavigateHook(withFirebase(HomePageBase));

export default withAuthorization(condition)(HomePage);