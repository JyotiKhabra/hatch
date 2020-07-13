import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Error from "./Error";
import "./Login.scss";
import Card from "@material-ui/core/Card";
import Cookies from "js-cookie";
import HatchIcon from "./images/hatch-main-logo.png";

function Login() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emptyPassword: false,
    emptyEmail: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [auth, setAuth] = useState(false);

  // Initial retrieval of all userdata
  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const formattedUsers = res.data.map((user) => user.user);
      setUsers(formattedUsers);
    });
  }, []);
  // Validation for google logins
  const googleValidate = (response) => {
    let currentUser = users.filter((user) => user.email === response.profileObj.email);
    if (currentUser.length > 0) {
      Cookies.set('user', currentUser[0]);
      setAuth(true); // redirect to dashboard
    }
  };
// Validations for normal logins
  function validate() {
    if (email && password) {
      setErrors({ ...errors, emptyPassword: false, emptyEmail: false });
      let currentUser = users.filter((user) => user.email === email)[0];
      if (!currentUser || currentUser.password_digest !== password) {
        setErrorMessage("We're sorry, the email or password seems to be incorrect.");
      } else {
        setErrorMessage("")
        Cookies.set("user", currentUser);
        setAuth(true); // redirect to dashboard
      }
    } else { 
      // Error messages for invalid or absent form input
      if (!email && !password) {
        setErrors({ errors, emptyEmail: true, emptyPassword: true });
      } else {
        if (!email) {
          setErrors({ errors, emptyEmail: true });
        }
        if (!password) {
          setErrors({ errors, emptyPassword: true });
        }
      }
    }
  }
  // Checks state of 'Auth' for successful login validation
  return auth ? (
    <Redirect to="/dashboard" />
  ) : (
    <div>
      <div id="login-main">
        <Card>
          <img class="login-logo" src={HatchIcon} alt="logo" />
          <Error errorMessage={errorMessage} />
          <form>
            <TextField
              id="standard-basic"
              className="login-input"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.emptyEmail}
              helperText={
                errors.emptyEmail ? "Please enter a valid email." : ""
              }
            />
            <TextField
              id="standard-basic"
              className="login-input"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.emptyPassword}
              helperText={
                errors.emptyPassword ? "Please enter a valid password." : ""
              }
            />
            <Button
              className="login-submit"
              color="primary"
              variant="contained"
              onClick={() => validate()}
            >
              Submit
            </Button>
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
  );
}
export default Login;
