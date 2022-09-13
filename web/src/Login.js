
import {auth} from './firebaseConfig';
import { GoogleAuthProvider, 
        FacebookAuthProvider, 
        GithubAuthProvider,
        signInWithPopup,
        signOut
    } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FacebookLoginButton, GoogleLoginButton, AppleLoginButton, GithubLoginButton} from 'react-social-login-buttons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login =  () => {

    const GoogleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();
    const GithubProvider = new GithubAuthProvider();

    //Login function to show the login pop-up depending on the button pressed
    const LoginWithProvider = async(provider) =>{
        toast.loading("Iniciando sesion...");
        
        await signInWithPopup(auth, provider)
            .then((result) => {
                toast.dismiss();
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(credential, token, user);
                toast.success("Sesion inciada!");
                // ...
            }).catch((error) => {
                toast.dismiss();
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                toast.error(error.message);
        });
    };

    //Login With email function
    const LoginWithEmail = async() =>{
        console.log("Login with email");
    };

    //Logout function
    function logout (){
        console.log("Login out user");
        signOut(auth);
    };

    //Email form creation
    function EmailFormConstructor() {
        return (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="agapito@pelikano.com" />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <div className='text-center'>
                <Button className="text-center" variant="primary" type="submit" onClick={LoginWithEmail}>
                Iniciar Sesion
                </Button>
            </div>
          </Form>
        );
      }

    return (<div className='centered-col'>
            <div>
                {EmailFormConstructor()}
            </div>
            
            <div>
                <div className="left-right-divider my-2">
                    <span className="text-color-text-low-emphasis px-2"> o </span>
                </div>

                <GoogleLoginButton onClick={() => { LoginWithProvider(GoogleProvider) }}/>
                <FacebookLoginButton onClick={() => { LoginWithProvider(FacebookProvider) }} />
                <GithubLoginButton onClick={() => { LoginWithProvider(GithubProvider) }} />
                <AppleLoginButton onClick={() => {toast.warn("No implementado!")}} />
                <ToastContainer autoClose={1500} pauseOnFocusLoss={false} draggable={false} npauseOnHover={false}/> 
            </div>

            <div>
                <hr/>
                <Button variant="secondary"
                    onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Login;