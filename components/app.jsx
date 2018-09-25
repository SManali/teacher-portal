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
      redirectUrl: "",
      errorText: "",
      accessToken: ""
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
    request.post('/login/authenticateUser', args).end((err, data) => {
      if (err) {
        console.log(err);
        this.setState({
          redirectUrl: "",
          errorText: "Invalid User name or password"
        });
        console.error(err.message);
      } else {
        console.log("login Page");
        console.log(data);
        this.setState({
          redirectUrl: "/students"
        });
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
      if (!err) {
        this.performLogin(userId, password);
      } else {
        this.setState({
          redirectUrl: ""
        });
        console.error(err.message);
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
                "submitButtonText": "Submit",
                "alreadyUserText": "Already user? Login here"
              }
            }
              performSignIn={this.performSignIn}/>
            } />
            <Route path="/login" exact component={() => <Login isAuthed={true} localizedText={
              {
                "userIDLabel": "Email ID / Phone Number",
                "loginAccountHeaderText": "Login to your account",
                "passwordLabel": "Password",
                "submitButtonText": "Submit",
                "registerText": "New User? Sign up here",
                "forgotOrClaimAccountText": "Forgot Password"
              }}
              performLogin={this.performLogin}/>
            } />
            <Route path="/students" exact component={() => <StudentList />} />
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