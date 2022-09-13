// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const config = process.env.REACT_APP_DEVELOPMENT === 'production' ? firebaseDevConfig : firebaseDevConfig;

//Clase firebase para ser utilizada por toda la aplicacion
class Firebase {
  constructor() {
    console.log(process.env.REACT_APP_API_KEY)
    //Arranque de las distintas herramientas que usamos de firebase
    const app = initializeApp(config);
    const auth = getAuth(app);
    const functions = getFunctions(app);

    if(process.env.REACT_APP_USE_SIMULATORS ==="1"){
      //Conectar a los simuladores pertinentes
      connectFunctionsEmulator(functions, "localhost", 5001);
    }
  }
}

export default Firebase;


/* TODO: Delete old unuseed code
//Obtener las funciones que se ejecutan en firebase
const LoginFunction = httpsCallable(functions, 'LoginFunction');


//Exportar lo necesario
export {LoginFunction};
*/