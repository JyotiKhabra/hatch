import React from "react";
import WeatherCard from "./WeatherCard";
import AddComponentButton from "./AddComponentButton";
import ComponentCard from "./ComponentCard";
import axios from 'axios'

import "./DestinationTab.scss";

export default function Destination(props) {

  const addComponentBox = () => {
    axios({
      method: 'POST',
      url: '/api/components',
      data: {
        destination_id: props.destination.destination.id
      }
    })
    .then(() => {
      props.getData()
    })
  };

  return (
    <>
      <WeatherCard destination={props.destination.destination} />
      <div class="page-components">
        {props.components.map((component) => {
          return (
            <ComponentCard
              key={component.component.component.id}
              component={component}
              getData={props.getData}
              destination_id={props.destination.destination.id}
              users={props.users}
            />
          );
        })}
        <button onClick={() => addComponentBox()}>
          <AddComponentButton />
        </button>
      </div>
    </>
  );
}
