import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import withNavigateHook, * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import { Button } from 'react-bootstrap';
import '../../common/style.css';
import GitHubButton from 'react-github-btn'

const HomePage = () => (
  <div className='centered-full-col'>
    <HomeForm />
  </div>
);

class HomePageBase extends Component {

  onSignOut = () => {
    this.props.firebase.doSignOut();
    this.props.navigation(ROUTES.SIGN_IN);
  };

  render() {
    return (
      <div className='centered-full-col'>
        <Button variant='secondary' type='submit' onClick={this.onSignOut}>
          Cerrar sesión
        </Button>
        <hr/>
        <GitHubButton href="https://github.com/joelmaca96/idiot-squirrel">Hechale un vistazo!</GitHubButton>
      </div>
    );
  }
}

//Condicion para mostrar la pagina, sencillamente cualquier usuario 
//autenticado puede verla
const condition = authUser => authUser != null;

const HomeForm = withNavigateHook(withFirebase(HomePageBase));

export default withAuthorization(condition)(HomePage);