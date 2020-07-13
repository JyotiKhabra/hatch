import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Trip from "./components/Trip.js";
import CreateTrip from "./components/CreateTrip";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/create-trip" component={CreateTrip} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/trip/:id" component={Trip} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
