import React, { Component }from 'react'; 
import withNavigateHook, * as ROUTES from '../../constants/routes';

//Landing de mnomento solo redirecciona al login
const Landing = () => (
  <div>
    <LandingPage />
  </div>
);

class LandingPageBase extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.navigation(ROUTES.SIGN_IN, { replace: true });
    return (
      <div className='centered-col'>
      </div>
    );
  }
}


const LandingPage = withNavigateHook(LandingPageBase);


export default withNavigateHook(Landing);