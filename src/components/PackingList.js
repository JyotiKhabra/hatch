import React, { useState, useEffect } from "react";
import axios from 'axios';
import PackingListItem from "./PackingListItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./PackingList.scss";
import Cookies from "js-cookie"

export default function PackingList(props) {
  const [newItem, setNewItem] = useState(false);

  const activeUser = JSON.parse(Cookies.get('user'));

  const addPackingListItem = () => {
    setNewItem(true);
  };

  const newInput = newItem ? (
    <PackingListItem
      trip_id={props.tripID}
      setNewItem={setNewItem}
      getData={props.getData}
      user={activeUser}
    />
  ) : null;

  return (
    <div id="packing-list">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Packing List
            <AddCircleIcon onClick={() => addPackingListItem()} />
          </Typography>
          <div>
            {/* Shows all packing list items */}
            {props.packingList.map((item) => {
              const itemUser = props.users.filter(user => user.id === item.packing_item.user_id);
              return (
                <PackingListItem
                  key={item.packing_item.id}
                  id={item.packing_item.id}
                  text={item.packing_item.description}
                  checked={item.packing_item.checked}
                  trip_id={props.tripID}
                  setNewItem={setNewItem}
                  getData={props.getData}
                  user={itemUser[0]}
                />
              );
            })}
            {/* Shows new input field */}
            {newInput}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
