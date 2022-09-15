import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './common/style.css';
import Firebase, { FirebaseContext } from './components/Firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //Crear y permitir el uso del contexto de firebase en toda la app
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
);
