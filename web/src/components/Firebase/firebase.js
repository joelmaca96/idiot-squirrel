// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signInWithPopup
        } from "firebase/auth"; 
import { getFunctions, connectFunctionsEmulator  } from "firebase/functions";

// Configuracion del backend de desarrollo
const firebaseDevConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};


//En un futuro será interesante tener un backend de desarrollo y otro de produccion
//Por el momento son el mismo
//TODO: Crear y desplegar un backend de desarrollo
const config = process.env.REACT_APP_BUILD_MODE === 'production' ? firebaseDevConfig : firebaseDevConfig;

//Clase firebase para ser utilizada por toda la aplicacion
class Firebase {
  constructor() {

    //Arranque del core de firebase
    const app = initializeApp(config);

    //Instanciar las distintas herramientas de firebase
    this.auth = getAuth(app);
    this.functions = getFunctions(app);

    //Conexion a los simuladores en lugar de al endpoint final
    if(process.env.REACT_APP_USE_SIMULATORS ==="1"){
      console.warn("Estas usando un entorno de desarrollo!!!");
      //Conectar a los simuladores pertinentes
      connectFunctionsEmulator(this.functions, "localhost", 5001);
    }
  }

  //API para las funciones de autenticacion
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth,email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignInWithPopUp = (provider) => 
    signInWithPopup(this.auth,provider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;


/* TODO: Delete old unuseed code
//Obtener las funciones que se ejecutan en firebase
const LoginFunction = httpsCallable(functions, 'LoginFunction');


//Exportar lo necesario
export {LoginFunction};
*/