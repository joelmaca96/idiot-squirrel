import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import withNavigateHook, * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import { Button } from 'react-bootstrap';
import '../../common/style.css';
import GitHubButton from 'react-github-btn';
import stupid_squirrel from '../../images/stupid-squirrel.jpg';
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
    const miPadding = {
      paddingTop: "10px"
    };
    return (
      <div>
        <div className='padding-top'>
          <img src={stupid_squirrel} alt='No se ha encontrado la imagen' />
        </div>
        <div className='text-center padding-top'>
          <Button variant='secondary' type='submit' onClick={this.onSignOut}>
            Cerrar sesión
          </Button>
          <div style={miPadding}>
            <GitHubButton href='https://github.com/joelmaca96/idiot-squirrel'>
              Hechale un vistazo!
            </GitHubButton>
          </div>
        </div>
      </div>
    );
  }
}

//Condicion para mostrar la pagina, sencillamente cualquier usuario
//autenticado puede verla
const condition = (authUser) => authUser != null;

const HomeForm = withNavigateHook(withFirebase(HomePageBase));

export default withAuthorization(condition)(HomePage);
