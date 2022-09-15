import React, { Component } from 'react';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import withNavigateHook, * as ROUTES from '../../constants/routes';
import { Form, Button } from 'react-bootstrap';
import '../../common/style.css';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => (
  <div className='centered-full-col'>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  //Inicio de sesion exitoso, ir a Home
  onSuccesFullLogin = () => {
    toast.dismiss();
    toast.success('Autenticado con exito!');

    this.setState({ ...INITIAL_STATE });
    this.props.navigation(ROUTES.HOME);
  };

  //TODO: Añadir loader de creacion de usuario y pop-ups de error de contraseña
  //Callback para la autenticacion mediante usuario y contraseña
  onSubmit = (event) => {
    toast.loading('Autenticando...');
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.onSuccesFullLogin();
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //Callback para autenticacion mediante terceros
  LoginWithProvider = async (provider) => {
    toast.loading('Iniciando sesion...');

    await this.props.firebase
      .doSignInWithPopUp(provider)
      .then((result) => {
        this.onSuccesFullLogin();
      })
      .catch((error) => {
        toast.dismiss();
        //Handle para usuario ya linkeado con provider distinto
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.props.firebase
            .doLinkWithRedirect(provider)
            .then((result) => {
              this.onSuccesFullLogin();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          //TODO: eliminar esto cuando termine de debuguear
          toast.error(error.message);
        }
      });
  };

  //Constructor del formulario email/contraseña
  EmailFormConstructor = () => {
    return (
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            onChange={this.onChange}
            name='email'
            value={this.state.email}
            placeholder='agapito@pelikano.com'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            onChange={this.onChange}
            name='passwordOne'
            value={this.state.passwordOne}
            placeholder='Contraseña'
          />
        </Form.Group>

        {
          //Mensaje de error
          this.state.error !== null ? (
            <div className='text-center alert-content'>{this.state.error}</div>
          ) : (
            <br />
          )
        }

        <div className='text-center'>
          <Button
            className='text-center'
            variant='primary'
            type='submit'
            onClick={this.onSubmit}
          >
            Iniciar sesión
          </Button>
        </div>
      </Form>
    );
  };

  //Constructor del formulario de social
  SocialLoginConstructor = () => {
    return (
      <div>
        <div className='left-right-divider my-2'>
          <span className='text-color-text-low-emphasis px-2'> o </span>
        </div>

        <GoogleLoginButton
          onClick={() => {
            this.LoginWithProvider(this.props.firebase.GoogleProvider);
          }}
        />
        <FacebookLoginButton
          onClick={() => {
            this.LoginWithProvider(this.props.firebase.FacebookProvider);
          }}
        />
        <GithubLoginButton
          onClick={() => {
            this.LoginWithProvider(this.props.firebase.GithubProvider);
          }}
        />
        <AppleLoginButton
          onClick={() => {
            toast.warn('No implementado!');
          }}
        />
      </div>
    );
  };

  render() {
    return (
      <div className='centered-col'>
        <div>{this.EmailFormConstructor()}</div>
        <div>
          {this.SocialLoginConstructor()}
          <ToastContainer
            autoClose={2000}
            pauseOnFocusLoss={false}
            draggable={false}
            npauseOnHover={false}
          />
          <SignUpLink />
        </div>
      </div>
    );
  }
}

//Objeto para mostrar en pantalla
const SignInForm = withNavigateHook(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
