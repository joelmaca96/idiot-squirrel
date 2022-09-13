import React from 'react';


//Crear un contexto para el componete Firebase, de manera
//que no sea posible instanciarlo mas de una vez
const FirebaseContext = React.createContext(null);

export default FirebaseContext;