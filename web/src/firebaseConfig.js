// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator  } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC00BlzTbAqk56INoVsW8QLKPi_COV__Jg",
  authDomain: "idiot-squirrel.firebaseapp.com",
  databaseURL: "https://idiot-squirrel-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "idiot-squirrel",
  storageBucket: "idiot-squirrel.appspot.com",
  messagingSenderId: "34474451610",
  appId: "1:34474451610:web:1fc2a9fd892056626a3523"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

//Obtener las funciones que se ejecutan en firebase
const LoginFunction = httpsCallable(functions, 'LoginFunction');


//Exportar lo necesario
export {LoginFunction, auth};
