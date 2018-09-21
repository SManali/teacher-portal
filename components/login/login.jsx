// export default Login;
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Login extends React.Component {

  render(){
    const text = this.props.localizedText;
    return (
      <div class="dashboard-main-holder vertical-horizontal-center">
        <div class="envelope-holder">
            <img src="assets/images/envelope.jpg" />
        </div>
        <div class="account-board">
            <div class="account-header text-center common-header-footer-margin">{text.loginAccountHeaderText}</div>
       
            <div class="account-form">
                <div class="userid-details form-group">
                    <label for="userid" class="userid-label">{text.userIDLabel}</label>
                    <input type="text" class="userid-field form-control" id="userid" />
                </div>
                <div class="password-details form-group">
                    <label for="userPassword" class="password-label">{text.passwordLabel}</label>
                    <input type="text" class="password-field form-control" id="userPassword"/>
                </div>
                <div class="submit-button-container text-center">
                    <input type="button" class="btn" value={text.submitButtonText} />
                </div>
                <a href="url">{text.forgetPaswordText}</a>
            </div>
    </div>
</div>

    )
  }
}
module.exports = Login;