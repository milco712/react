import React from "react";
import { List } from "./list.jsx";
import { Insert } from "./insert.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (

    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
  <div>
    <h1>Favorite Things</h1>
    <List />
    <Insert />
  </div>
)};
