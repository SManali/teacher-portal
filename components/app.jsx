import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Login from './login/login';
import SignUp from './sign-up/sign-up'

ReactDOM.render(
<div>
  <div>test</div>
  <Router>
      <div>
        <Route path="/sign-up" exact component={() => <SignUp isAuthed={true} localizedText={
            {
              "userIDLabel":"Email ID / Phone Number",
              "loginAccountHeaderText":"Create a new Account",
              "passwordLabel":"Password",
              "submitButtonText":"Submit"
            }
          }/>
        }/>
        <Route path="/login" exact component={() => <Login isAuthed={true} localizedText={
            {
              "userIDLabel":"Email ID / Phone Number",
              "loginAccountHeaderText": "Login to your account",
              "passwordLabel":"Password",
              "submitButtonText":"Submit",
              "forgetPaswordText":"Forgot Password/Claim your Account"
            }
          }/>
        } />
      </div>
  </Router>
  </div>,
  document.getElementById('app')
);