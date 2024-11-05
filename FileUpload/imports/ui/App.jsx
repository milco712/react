import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Detail from "./Detail";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
};
