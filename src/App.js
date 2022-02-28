import logo from "./logo.svg";
import "./App.css";
import React from "react";

// import { RealTimeChart } from "./RealTimeChart";
import SingleStep from "./components/Live/SingleStep";
import MainRoute from "./routing/MainRoute";
import { Routes } from "react-router-dom";
// import Live from "./components/Live/Live";
// import StaticChart from "./components/Static/StaticChart";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return <MainRoute />;
}

export default App;
