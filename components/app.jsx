import request from 'superagent';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './login';
import SignUp from './sign-up';
import StudentList from './student-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticationToken: "",
      redirectUrl: ""
    }
    this.performLogin = this.performLogin.bind(this);
    this.performSignIn = this.performSignIn.bind(this);
  }
  performLogin(userId, password) {
    const args = {
      data: {
        userId: userId,
        password: password
      },
      header: {
        'Content-Type': 'application/json',
      }
    };
    const self = this;
    request.post('/login/authenticateUser', args).end((err, data) => {
      console.log(data);
      if (!err) {
        self.setState({
          redirectUrl: "/students"
        });
      } else {
        self.setState({
          redirectUrl: ""
        });
        console.error(data.body.message);
      }
    });
  }

  performSignIn(userId, password) {
    const args = {
      data: {
        userId: userId,
        password: password
      },
      header: {
        'Content-Type': 'application/json',
      }
    };
    request.post('/login/createUser', args).end((err, data) => {
      console.log(data);
      if (!err) {
        this.setState({
          redirectUrl: "/students"
        });
      } else {
        this.setState({
          redirectUrl: ""
        });
        console.error(data.body.message);
      }
    });
  }

  showOverlay() {
    window.openOverlay('overlay-inAbox');
    this.setState({ loaded: false });
  }
  hideOverlay() {
    window.closeOverlay('overlay-inAbox');
    this.setState({ loaded: true });
  }

  render() {
    const redirect = () => {
      if (this.state.redirectUrl) {
        return (<Redirect to={this.state.redirectUrl} />);
      } else {
        return (<div></div>);
      }
    }
    return (
      <div>
        <Router>
          <div>
            <Route path="/sign-up" exact component={() => <SignUp isAuthed={true} localizedText={
              {
                "userIDLabel": "Email ID / Phone Number",
                "newAccountHeaderText": "Create a new Account",
                "passwordLabel": "Password",
                "submitButtonText": "Submit"
              }
            }
            performSignIn= {this.performSignIn} />
            } />
            <Route path="/login" exact component={() => <Login isAuthed={true} localizedText={
              {
                "userIDLabel": "Email ID / Phone Number",
                "loginAccountHeaderText": "Login to your account",
                "passwordLabel": "Password",
                "submitButtonText": "Submit",
                "registerText": "New User sign up here",
                "forgotOrClaimAccountText":"Forgot Password"
              }}
              performLogin={this.performLogin} />
            } />
            <Route path="/students" exact component = {()=> <StudentList/>} />
            {redirect()}
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);