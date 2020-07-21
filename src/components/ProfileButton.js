import React from "react";
import { Link } from "react-router-dom";
import "./ProfileButton.scss";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function ProfileButton() {
  const user = JSON.parse(Cookies.get("user"));
  const name = user.name.split(" ")[0];

  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();

  function handleClick() {
    history.push("/");
    handleClose();
  }

  function logout() {
    Cookies.remove("user");
    handleClick();
  }
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div class="right-menu">
      {
        <div id="profile-icon">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle 
              style={{ color: user.avatar }}
            />
            <h2>{name}</h2>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              {" "}
              <Link to="/create-trip" onClick={handleClose}>
                New Trip
              </Link>
            </MenuItem>

            <Link to="/dashboard">
              <MenuItem onClick={handleClose}>Dashboard</MenuItem>
            </Link>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      }
    </div>
  );
}
