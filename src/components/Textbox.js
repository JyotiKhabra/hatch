import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PointsOfInterest from "./PointsOfInterest";
import axios from 'axios';
import Cookies from 'js-cookie'

function Textbox(props) {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState([])

  const user = JSON.parse(Cookies.get('user'))

  const handleClose = () => {
    setOpen(false);
    props.setMode("SHOW")
  };

  const onSave = () => {
    console.log(place)
    axios({
      method: "POST",
      url: `/api/component_items`,
      data: {
        title: Object.keys(place).length > 0 ? place.description : title,
        description: description,
        component_id: props.component_id,
        user_id: user.id,
        place_id: place.place_id
      }
    })
    .then(res => {
      props.getData()
      handleClose()
      props.setMode("EDIT")
    })
  };

  const input = props.mode === "TEXT" 
  ? (
    <>
      <TextField
        id="name"
        autoFocus
        margin="dense"
        label="Title"
        type="text"
        fullWidth
        value={title}
        onChange= {(event) => setTitle(event.target.value)}
      />
      <TextField
        id="description"
        autoFocus
        margin="dense"
        multiline
        rowsMax={10}
        label="Description"
        type="text"
        fullWidth
        value={description}
        onChange= {(event) => setDescription(event.target.value)}
      />
    </>
  )
  : (
  <>
    <PointsOfInterest setPlace={setPlace}/>
    <TextField
        id="description"
        autoFocus
        margin="dense"
        multiline
        rowsMax={10}
        label="Description"
        type="text"
        fullWidth
        value={description}
        onChange= {(event) => setDescription(event.target.value)}
      />
  </>)

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Idea Bank</DialogTitle>
        <DialogContent>
          {input}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Textbox;
