import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserSearch.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Cookies from "js-cookie";

export default function UserSearch(props) {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [value, setValue] = useState([]);

  const currentUser = JSON.parse(Cookies.get("user"));

  useEffect(() => {
    axios.get(`/api/users`)
    .then((res) => {
      const formattedUsers = res.data.map((user) => {
        return user.user;
      });
      setUsers(formattedUsers);
    });
  }, []);

  function filteredOptions() {
    let filteredUsers = users.filter(user => user.id !== currentUser.id);
  
    if (props.collaborators.length > 0) {
      props.collaborators.map(collaborator => {
        filteredUsers = filteredUsers.filter(user => user.id !== collaborator.id)
      })
    }
    
    return filteredUsers;
  }

  return (
    <section className="search">
      <Autocomplete
        multiple
        id="tags-standard"
        options={filteredOptions()}
        getOptionLabel={(user) => user.name}
        defaultValue={users}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.setCollaborators(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-basic"
            label="Collaborators"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        )}
      />
    </section>
  );
}
