import React, { Component } from "react";
import apiUrl from "../../apiConfig";
import { setUser } from "./../../services/AuthService";
import homeSing from "./../../imges/hi10.gif";

class SignupForm extends Component {
  state = {
    formData: {
      email: null,
      password: null,
      password_confirmation: null
    },
    err: null
  };

  handleLoginRequest = user => {

    console.log(user)
    let url = `${apiUrl}/sign-up`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ credentials: user })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 299)
          this.setState({ err: data.message });
        else {
          setUser(data);
          this.props.onSignin();
        }
      })
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleLoginRequest(this.state.formData);
  };

  handleChange = ({ currentTarget }) => {
    const formData = { ...this.state.formData };
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
  };

  render() {
    return (
      <div className="pt-5 mt-5">
        {this.state.err ? (
          <div className="alert alert-warning"> {this.state.err} </div>
        ) : (
            ""
          )}
        <div className="container mmmm">
          <div className="row">
            <img className="col-sm" className="pucHomeSingup" src={homeSing} alt="Logo" />
            <form className="col-sm nnnn" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="textUpInput">Email </label>
                <input
                  name="email"
                  className="form-control formSingn"
                  onChange={this.handleChange}
                />
                <label className="textUpInput">Password</label>
                <input
                  name="password"
                  className="form-control formSingn"
                  type="password"
                  onChange={this.handleChange}
                />
                <label className="textUpInput">Password Confirmation</label>
                <input
                  name="password_confirmation"
                  className="form-control formSingn"
                  type="password"
                  onChange={this.handleChange}
                />
                <label className="textUpInput">Phone Number</label>
                <input
                  name="phine_number"
                  className="form-control formSingn"
                  type="phone_number"
                  onChange={this.handleChange}
                />
              </div>


              <button class="col-sm" onClick={() => this.props.changeActivePage("home")} className="cssBtnBack">Back</button>
              <button type="submit" className="cssBtn ">Register</button>

            </form>



          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
