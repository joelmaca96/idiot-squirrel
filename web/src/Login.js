
import {auth} from './firebaseConfig';
import { GoogleAuthProvider, 
        FacebookAuthProvider, 
        GithubAuthProvider,
        signInWithPopup,
        signOut
    } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import {FacebookLoginButton, GoogleLoginButton, AppleLoginButton, GithubLoginButton} from 'react-social-login-buttons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login =  () => {

    const GoogleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();
    const GithubProvider = new GithubAuthProvider();

    //Login function to show the login pop-up depending on the button pressed
    const LoginWithProvider = async(provider) =>{

    //hacemos la funcion async y nos aseguramos de que solo admite posts de la url deseada:
        await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(credential, token, user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        });
    };

    //Logout function
    function logout (){
        console.log("Login out user");
        signOut(auth);
    };

    return (<div className='centered-col'>
            <GoogleLoginButton onClick={() => { LoginWithProvider(GoogleProvider) }}/>
            <FacebookLoginButton onClick={() => { LoginWithProvider(FacebookProvider) }} />
            <GithubLoginButton onClick={() => { LoginWithProvider(GithubProvider) }} />
            <AppleLoginButton onClick={() => {toast.warn("No implementado!")}} />

            <ToastContainer autoClose={1500}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}/>            
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