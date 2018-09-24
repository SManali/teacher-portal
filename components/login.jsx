// export default Login;
import React from 'react';
import {
    Link
} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: ""
        }
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        const userId = this.userId.value;
        const password = this.password.value;
        const errorText = this.getErrorText(userId, password);
        this.setState({
            "errorText": errorText
        });
        if (errorText === "") {
            this.props.performLogin(userId, password);
        }
    }

    getErrorText(userId, password) {
        let errorText = "";
        if (userId === "" || password === "") {
            errorText = "User Id or password can not be empty";
        }
        return errorText;
    }

    render() {
        const text = this.props.localizedText;
        const getError = (() => {
            if (this.state.errorText) {
                return (
                    <div>this.state.errorText</div>
                )
            } else {
                return (<div></div>)
            }
        })
        return (
            <div class="dashboard-main-holder vertical-horizontal-center">
                {getError()}
                <div class="envelope-holder">
                    <img src="assets/images/envelope.jpg" />
                </div>
                <div class="account-board">
                    <div class="account-header text-center common-header-footer-margin">{text.loginAccountHeaderText}</div>
                    <div class="account-form">
                        <div class="userid-details form-group">
                            <label for="userid" class="userid-label">{text.userIDLabel}</label>
                            <input type="text" class="userid-field form-control" id="userid" ref={(child) => { this.userId = child; }} />
                        </div>
                        <div class="password-details form-group">
                            <label for="userPassword" class="password-label">{text.passwordLabel}</label>
                            <input type="text" class="password-field form-control" id="userPassword" ref={(child) => { this.password = child; }} />
                        </div>
                        <div class="submit-button-container text-center">
                            <input type="button" class="btn" value={text.submitButtonText} onClick={this.loginUser} />
                        </div>
                    </div>
                    <div>
                        <Link to="/sign-up"><href class="register text-center common-header-footer-margin">{text.registerText}</href></Link>
                        <span> \ </span>
                        <href class="forgot-or-claim-account text-center common-header-footer-margin">{text.forgotOrClaimAccountText}</href>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = Login;