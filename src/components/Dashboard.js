import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Dashboard.scss";
import DashboardItem from "./DashboardItem";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
    className: "Photos",
  };

  const user_session = Cookies.get("user_session");
  console.log('user session', user_session);
  useEffect(() => {

    console.log(user_session);
    if (user_session) {
      axios
        .get(`/api/users/1`)
        .then((res) => {
          console.log("usertripinfo",res)
          setTrips(res.data)
        })
        .catch((err) => {
          console.log("ERR",err);
        });
    }
    // if (user_session) {
    //   axios(`/auth/user/`,{
    //     method: 'GET',
    //     header: {'Authentication': `Token ${user_session}`}
    //   })
    //     .then((res) => {
    //       console.log("RES:", res)
    //     })
    //     .catch((err) => {
    //       console.log("ERR",err);
    //     });
    // }
  }, []);

  const formattedTrips =
    trips.length > 0
      ? trips.map((trip) => (
          <>
            <DashboardItem
              key={trip.trip.trip.id}
              trip={trip.trip.trip}
              destinations={trip.destinations}
              setTrips={setTrips}
            />
          </>
        ))
      : null;

  return !user_session ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Nav />
      <div id="dash">
        <div class="dashboard-label"></div>

        <Slider {...settings}>
          {formattedTrips}
          <DashboardItem add={true} />
        </Slider>
      </div>
    </>
  );
}
