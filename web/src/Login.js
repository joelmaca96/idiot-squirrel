import React ,{useState} from 'react';
import {LoginFunction, auth} from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleLogin  } from 'react-google-login';





export default () => {
    const [title, setTitle] = useState('');
    const provider = new GoogleAuthProvider();

    const responseGoogle = (response) => {
        console.log(response);
    }

    //funcion que se ejecuta al pulsar en el boton submit:
    const onSubmit = async(event) =>{
        event.preventDefault();

        //hacemos la funcion async y nos aseguramos de que solo admite posts de la url deseada:
        signInWithPopup(auth, provider)
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

        //Una ez creado el post, limpiamos el titulo para que se pueda crear el siguiente:
        setTitle('');
    };

    return (<div> 
        <GoogleLogin
            clientId="424344501351-upv9uvkgq4psi4pnsljeuuacl5ivjm8u.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
        </div>
    );
};