import React from 'react';


//Crear un contexto para el componete Firebase, de manera
//que no sea posible instanciarlo mas de una vez
const FirebaseContext = React.createContext(null);

//Exportar el contexto
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;