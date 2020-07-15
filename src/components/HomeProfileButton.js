import React from "react";
import Cookies from "js-cookie";
import "./ProfileButton.scss";
import Button from "@material-ui/core/Button";
import ProfileButton from "./ProfileButton";

export default function HomeProfileButton() {
  const user = Cookies.get("user");

  return user ? (
    <ProfileButton />
  ) : (
    <div class="right-menu">
      <div class="profile-icon">
        <Button a href="/login" variant="outlined">
          Login
        </Button>
        <Button a href="/signup" variant="outlined">
          Sign-up
        </Button>
      </div>
    </div>
  );
}
