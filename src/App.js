import React, { Component } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { getUser, Signout } from "./services/AuthService";
import SigninForm from "./components/authForm.js/SigninForm";
import SignupForm from "./components/authForm.js/SignupForm";
import ChangePasswordForm from "./components/authForm.js/ChangePasswordForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Addpost from "./components/authForm.js/Addpost.js"

class App extends Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
  state = {
    user: null,
    activePage: "home"
  };
  componentDidMount() {
    // check if we have a token in the local storage
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }
  //my change
  handleClick() {
    console.log('Click happened');
  }
  routeChange() {
    let path = "src/components/authForm.js/SigninForm.js";
    this.props.history.push(path);
  }
  //end 
  changeActivePage = activePage => {
    this.setState({ activePage });
  };
  onSignin = () => {
    this.setState({ user: getUser() });
    this.changeActivePage("profile");
  };
  onSignIn = () => {
    this.setState({ user: getUser() });
    this.changeActivePage("sign-in");
  };
  onSignUp = () => {
    this.setState({ user: getUser() });
    this.changeActivePage("sign-up");
  };

  onSignout = () => {
    console.log("sigin out");
    this.setState({ user: null });
    Signout();
  };
  render() {
    const { user, activePage } = this.state;
    return (
      <div>
        <Nav
          user={user}
          changeActivePage={this.changeActivePage}
          onSignout={this.onSignout} 
          activePage={activePage} />
         <div className="container">
          {activePage === "home" ? <Home onSignIn={this.onSignIn} onSignUp={this.onSignUp}/> : ""}
          {activePage === "sign-in" ? (
            <SigninForm onSignin={this.onSignin} changeActivePage={this.changeActivePage}/>
          ) : (
            ""
          )}
          {activePage === "sign-up" ? (
            <SignupForm onSignin={this.onSignin} changeActivePage={this.changeActivePage}/>
          ) : (
            ""
          )}
          {activePage === "change-password" ? (
            <ChangePasswordForm changeActivePage={this.changeActivePage}  />
          ) : (
            ""
          )}
          {activePage === "profile" ? <Profile /> : ""}
          {
            activePage === "post" ? < Addpost changeActivePage = {
              this.changeActivePage
            }
            /> : ""}
        </div>
      </div>
      );
      
  }
}

export default App;
