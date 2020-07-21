import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "./Avatar.scss";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    display: "flex",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rounded: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    color: "#fff",
    backgroundColor: "#2b2b2b",
  },
}));

export default function ComponentItem(props) {
  const classes = useStyles();

  const onDelete = () => {
    axios({
      method: "DELETE",
      url: `/api/component_items/${props.component_item.id}`,
      data: {
        component_id: props.component_id,
      },
    }).then((res) => {
      props.getData();
    });
  };

  const text = props.component_item.image_url ? (
    <Typography>
      <Avatar variant="rounded" className={classes.rounded}>
        <img
          class="place"
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${props.component_item.image_url}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          alt="attraction"
        />
      </Avatar>
      <div class="text-area">
        {props.component_item.description}

        <b>{props.component_item.address}</b>
      </div>
    </Typography>
  ) : (
    <Typography>{props.component_item.description}</Typography>
  );

  function nameToInitial(name) {
    if (name) {
      const split = name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0);
      return split;
    }
    return "H";
  }

  const avatarClass = classnames({
    "avatar--purple": props.user.avatar === "#6f5782",
    "avatar--pink": props.user.avatar === "#d6b0d6",
    "avatar--red": props.user.avatar === "#9e5454",
    "avatar--light-blue": props.user.avatar === "#a7cdcf",
    "avatar--orange": props.user.avatar === "#d1a773",
    "avatar--yellow": props.user.avatar === "#e3e0ac", 
    "avatar--green": props.user.avatar === "#74a381",
    "avatar--blue": props.user.avatar === "#4a63b0",
    "avatar--default": !props.user.avatar
  })

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel1a-header"
        >
          <Avatar className={avatarClass}>
            {nameToInitial(props.user.name)}
          </Avatar>
          <ListItemText primary={props.component_item.title} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{text}</ExpansionPanelDetails>
      </ExpansionPanel>
      <IconButton edge="end" aria-label="delete" onClick={() => onDelete()}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
