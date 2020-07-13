import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Error from "./Error";
import Card from "@material-ui/core/Card";
import Cookies from "js-cookie";
import Nav from "./Nav";

export default function Signup() {
  // All current users in DB
  const [users, setUsers] = useState([]);
  // State of input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Status of empty input fields
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  // Error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [minPassLen, setMinPassLen] = useState(false);
  const [confirmPWMatch, setConfirmPWMatch] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const formattedUsers = res.data.map((user) => user.user);
      setUsers(formattedUsers);
    });
  }, []);

  function validateEmail() {
    const emailExists = users.filter(user => user.email === email.toLowerCase())
    if (emailExists.length > 0) {
      setError({
        name: false,
        email: true,
        password: false,
        confirmPassword: false
      })
      setInvalidEmail(true);
    } else {
      return true;
    }
    return false;
  }

  function validatePassword() {
    if (password.length < 8) {
      setError({
        ...error,
        password: true
      })
      setMinPassLen(true);
    } else if(password !== confirmPassword) {
      setError({
        ...error,
        password: false,
        confirmPassword: true
      })
      setMinPassLen(false);
      setConfirmPWMatch(true);
    } else {
      setMinPassLen(false);
      setConfirmPWMatch(false);
      return true;
    }
    return false;
  }

  function validate() {
    if (!name || !email || !password || !confirmPassword) {
      // Error message and input field highlights when there are missing fields
      setError({
        name: !name,
        email: !email,
        password: !password,
        confirmPassword: !confirmPassword
      })
      setErrorMessage("Please make sure all fields are specified");
    } else {
      // Path for when all input fields are occupied
      setErrorMessage("");
      setError({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      });
      if(validateEmail() && validatePassword()) {
        // Successful signup path
        axios({
          method: "POST",
          url: "/api/users",
          data: {
            name: name,
            email: email,
            password_digest: password
          }
        })
        .then(res => {
          Cookies.set("user", res.data.user);
          setAuth(true);
        })
        .catch(err => console.log(err));
      }
    }
  }

  function googleValidate() {}

  return auth ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Nav />
      <div>
        <div id="login-main">
          <Card>
            <h3>Sign-Up</h3>
            <Error errorMessage={errorMessage}/>
            <form>
            <TextField
                id="standard-basic"
                className="login-input"
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={error.name}
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={error.email}
                helperText={invalidEmail ? "That email is already used for another account." : ""}
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={error.password}
                helperText={minPassLen? "Passwords must have a minimum length of 8 characters." : ""}
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                error={error.confirmPassword}
                helperText={confirmPWMatch ? "Passwords don't match. Please try again." : ""}
              />
              <Button
                className="login-submit"
                color="primary"
                variant="contained"
                onClick={() => validate()}
              >Submit</Button>
            </form>
            <span class="login-or">- OR -</span>
            <GoogleLogin
              className="google-login"
              theme="dark"
              clientId="570246861484-25ichbk39vud42a6n5innl8p99811kr9.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={googleValidate}
              onFailure={googleValidate}
              cookiePolicy={"single_host_origin"}
            />
          </Card>
        </div>
      </div>
    </>
  )
}