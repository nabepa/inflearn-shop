import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import SigninPage from './views/SigninPage/SigninPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';

//null   Anyone Can go inside
//true   only signed in user can go inside
//false  signed in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/signin' component={Auth(SigninPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route
            exact
            path='/product/upload'
            component={Auth(UploadProductPage, true)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
