import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import withNavigateHook, * as ROUTES from '../../constants/routes';
import { Button } from 'react-bootstrap';
import "../../style.css"

const HomePage = () => (
  <div className='centered-full-col'>
    <HomeForm />
  </div>
);


class HomePageBase extends Component {
  constructor(props) {
    super(props);
  }

  onSignOut = () => {
    this.props.firebase.doSignOut();
    this.props.navigation(ROUTES.SIGN_IN, { replace: true });
  }

  render(){
    return(
    <div className='centered-full-col'>
      <Button variant="secondary" type="submit" onClick={this.onSignOut }>
      Cerrar sesión
      </Button>
    </div>
    )
  }
}


const HomeForm = withNavigateHook(withFirebase(HomePageBase));

export default HomePage;