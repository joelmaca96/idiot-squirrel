import React from 'react';
import { Button } from 'react-bootstrap';
import { withFirebase } from '../Firebase';

const NavBar = (props) => (
  <div className='right-aligned'>
    <Button variant="secondary" type="submit" onClick={props.firebase.doSignOut}>
    Cerrar sesión
    </Button>
  </div>
);

export default withFirebase(NavBar);