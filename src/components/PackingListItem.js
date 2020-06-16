import React, { useState } from "react";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import classnames from 'classnames';
import Cookies from 'js-cookie'

export default function PackingListItem(props) {
  const [checked, setChecked] = useState(props.checked);
  const [text, setText] = useState(props.text ? props.text : "");

  const user = JSON.parse(Cookies.get('user'));

  function toggleCheck() {
    if (checked) {
      setChecked(false);
      updateCheck(false);
    } else {
      setChecked(true);
      updateCheck(true);
    }
  }

  function updateCheck(status) {
    axios({
      method: "PATCH",
      url: `/api/packing_items/${props.id}`,
      data: {
        description: text,
        trip_id: props.trip_id,
        checked: status,
        creator_name: props.creator_name
      },
    })
    .then(() => {
      props.getData()
    });
  }

  function deleteItem() {
    props.setNewItem(false);
    axios({
      method: "DELETE",
      url: `/api/packing_items/${props.id}`,
      data: {
        description: text,
        trip_id: props.trip_id,
      },
    }).then(() => {
      props.getData();
    });
  }

  function updateItem() {
    props.setNewItem(false);
    axios({
      method: "PATCH",
      url: `/api/packing_items/${props.id}`,
      data: {
        description: text,
        trip_id: props.trip_id,
        checked: checked,
        creator_name: user.name
      },
    }).then((res) => {
      props.getData();
    });
  }

  function createItem() {
    props.setNewItem(false);
    axios({
      method: "POST",
      url: "/api/packing_items",
      data: {
        description: text,
        trip_id: props.trip_id,
        checked: checked,
        creator_name: user.name
      },
    }).then((res) => {
      props.getData();
    });
  }

  function onBlur() {
    if (!props.text && !text) {
      props.setNewItem(false);
    } else if (!props.text) {
      createItem();
    } else if (!text) {
      deleteItem();
    } else {
      updateItem();
    }
  }

  function keyPressed(event) {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }

  function nameToInitial(name) {
    if (name) {
      const split = name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)
      return split;
    }
    return 'H';
  }
 
  const avatarClass = classnames({
    "avatar--blue": props.creator_name === "Joey Kishiuchi",
    "avatar--orange": props.creator_name === "Stacey Keating", 
    "avatar--green": props.creator_name === "Jyoti Khabra",
    "avatar--default": !props.creator_name
  })

  return (
    <ListItem key={props.id} role={undefined} dense button>
      <Avatar className={avatarClass}>{nameToInitial(props.creator_name)}</Avatar>
      <ListItemIcon class="list-item-icons">
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={props.id}
          disableRipple
          inputProps={{ "aria-labelledby": props.id }}
          onClick={() => toggleCheck()}
        />
      </ListItemIcon>

      <ListItemText
        id={props.id}
        onKeyPress={keyPressed}
        onBlur={() => onBlur()}
      >
        <TextField
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </ListItemText>
    </ListItem>
  );
}
