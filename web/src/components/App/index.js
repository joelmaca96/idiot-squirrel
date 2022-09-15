import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Routes>
        {/*TODO: Reactivar la landing page*/}
        <Route exact path={ROUTES.LANDING} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </div>
  </Router>
);
export default App;
