import React from "react";
import "./Nav.scss";
import ProfileButton from "./ProfileButton";
import mainLogo from "./images/hatch-main-logo.png";
import Cookies from "js-cookie";
import useUserData from "../hooks/useUserData";


export default function Nav(props) {
  const {user, getUser} = useUserData()

//  const user = Cookies.get("user");

  function navMode() {
    if (!user.name) 
      {
        if (props.page === 'login') {
          return <a class="nav-link" href="/signup">Sign Up</a> 
        } else {
          return <a class="nav-link" href="/login">Login</a>
        }
      } else {
      return <ProfileButton />
    }
  }

  return (
    <header class="nav-container">
      <nav class="navbar">
        <a href="/">
          <img href="/" class="header-logo" src={mainLogo} alt="Main Header" />
        </a>
        {navMode()}
      </nav>
    </header>
  );
}