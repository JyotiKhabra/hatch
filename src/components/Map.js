import React, {useState, useEffect, useCallback} from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import icon from './images/hatch-marker-icon.png'

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = { lat: 49.2827, lng: -123.1207 };

function Map(props) {
  const [destinations, setDestinations] = useState([]);
  
  console.log(props.destinations)

  useEffect(() => {
    setDestinations(props.destinations)
  }, [props]);

 
    const points = destinations.map(item => {
      return (
        { 
          lat: Number(item.destination.lat), 
          lng: Number(item.destination.lng) 
        }
      )
    });
  

  const onLoad = useCallback(function callback(map) {
    console.log('loaded')
    const bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    map.fitBounds(bounds);
  }, [points]);
 
  const markers = destinations.map(item => {
    return(
      <Marker
        label={{
          fontSize: '18px',
          fontWeigh: '800',
          text: item.destination.name
        }}
        opacity={0.8}
        icon={icon}
        position={{ lat: Number(item.destination.lat), lng: Number(item.destination.lng) }}
      />)
  });
  // Assures that destinations have populated before rendering map.
  const map = props.destinations.length > 0 ? (
    <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          options={{
            disableDefaultUI: true,
            maxZoom: 10,
          }}
        >
          { markers }}
        </GoogleMap>
  ) : null;

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyAlNz_VzfRUMEfZgsQK0noHXmRQ3YV6OqY"
        libraries={["places"]}
      >
      {map}
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
