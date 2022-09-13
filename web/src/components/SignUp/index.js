import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Form, Button } from 'react-bootstrap';
import '../../style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => (
  <div className='centered-full-col'>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  //TODO: Editar esto para que compruebe mejor los requerimientos de email y pass
  isInvalid = () =>{
      return(
        this.state.passwordOne !== this.state.passwordTwo ||
        this.state.passwordOne === '' ||
        this.state.email === ''
      )
  }

  //TODO: Añadir loader de creacion de usuario y pop-ups de error de contraseña
  onSubmit = event => {
    toast.loading("Creando usuario...");
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        toast.dismiss();
        toast.success("Usuario creado con exito!")
        //Creacion exitosa de usuario --> ir a Login
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        toast.dismiss();
        toast.error(error);
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //Email form creation
  EmailFormConstructor = () =>{
    return(
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" onChange={this.onChange} name ="email" value={this.state.email} placeholder="agapito@pelikano.com" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Contraseña</Form.Label>
      <Form.Control type="password" onChange={this.onChange} name ="passwordOne" value={this.state.passwordOne} placeholder="Contraseña" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword2">
      <Form.Label>Confirmar contraseña</Form.Label>
      <Form.Control type="password"  onChange={this.onChange} name ="passwordTwo" value={this.state.passwordTwo} placeholder="Confirmar contraseña" />
    </Form.Group>

    <div className='text-center'>
        <Button className="text-center" disabled={this.isInvalid()} variant="primary" type="submit" onClick={this.onSubmit}>
        Crear usuario
        </Button>
    </div>
  </Form>
    )
  }

  render() {

    return (
      <div className='centered-col'>
        <ToastContainer autoClose={2000} pauseOnFocusLoss={false} draggable={false} npauseOnHover={false}/> 
        {this.EmailFormConstructor()}
        
      </div>
      
    );
  }
}

//Link para traer a esta pagina desde la de sign in
const SignUpLink = () => (
  <p>
    No tienes una cuenta pringao? <Link to={ROUTES.SIGN_UP}>Crea una</Link>
  </p>
);

//Objeto para mostrar en pantalla
const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };