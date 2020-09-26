import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import Home from "./components/Home";
import PracHist from "./components/PracHist/PracHist";
import MoveInsights from "./components/MoveInsights/MoveInsights";
import StartPrac from "./components/StartPrac/StartPrac";

import './App.css';

function App() {
  return (
    <Router>
      <MainNav />
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/practice-history" exact component={PracHist} />
        <Route path="/move-insights" exact component={MoveInsights} />
        <Route path="/start" exact component={StartPrac} />
      </div>
    </Router>
  );
}

export default App;
