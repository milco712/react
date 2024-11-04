import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import List from "./List";
import Multiple from "./Multiple";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:_id" element={<Detail />} />
        <Route path="/Multiple" element={<Multiple />} />
      </Routes>
    </Router>
  );
};
