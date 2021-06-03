import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {environment} from './environments/environments';
import Amplify from '@aws-amplify/core';
console.info(environment.cognito)
Amplify.configure({
  Auth:{
    identityPoolId: environment.cognito.identityPool,
    region: environment.region,
    userPoolId: environment.cognito.userPool,
    userPoolWebClientId: environment.cognito.clientId,
    mandatorySingIn: true,
    oauth:{
      domain: environment.cognito.appDomain,
      redirectSignIn: window.location.origin+'/test',
      redirectSignOut: window.location.origin+'/',
      responseType: environment.cognito.responseType
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
