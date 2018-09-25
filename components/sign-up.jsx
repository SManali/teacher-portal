import React from 'react';
import {
    Link
} from 'react-router-dom';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: ""
        }
        this.signInUser = this.signInUser.bind(this);
    }

    signInUser() {
        const userId = this.userId.value;
        const password = this.password.value;
        const errorText = this.getErrorText(userId, password);
        this.setState({
            "errorText": errorText
        });
        if (errorText === "") {
            this.props.performSignIn(userId, password);
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
                    <div>{this.state.errorText}</div>
                )
            } else {
                return (<div></div>)
            }
        })
        return (
            <div class="dashboard-main-holder vertical-horizontal-center">
                <div class="envelope-holder">
                    <img src="assets/images/envelope.jpg" />
                </div>
                <div class="account-board">
                    <div class="account-header text-center common-header-footer-margin"><h4>{text.newAccountHeaderText}</h4></div>
                    <div class="account-form">
                        <div class="col-sm-3">
                            <small id="passwordHelp" class="text-danger">
                                {getError()}
                            </small>
                        </div>
                        <div class="userid-details form-group">
                            <label for="userid" class="userid-label">{text.userIDLabel}</label>
                            <input type="text" class="userid-field form-control" id="userid" ref={(child) => { this.userId = child; }} />
                        </div>
                        <div class="password-details form-group">
                            <label for="userPassword" class="password-label">{text.passwordLabel}</label>
                            <input type="password" class="password-field form-control" id="userPassword" ref={(child) => { this.password = child; }} />
                        </div>
                        <div class="submit-button-container text-center">
                            <input type="button" class="btn" value={text.submitButtonText} onClick={this.signInUser} />
                        </div>
                        <div>
                            <Link to="/login"><href class="register text-center common-header-footer-margin">{text.alreadyUserText}</href></Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
module.exports = SignIn;