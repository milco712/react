import React from "react";
import { List } from "./list.jsx";
import { Insert } from "./insert.jsx";
import { Detail } from "./detail.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const App = () => {
  return (

  <div>
    <h1>Favorite Things</h1>
    <Router>
      <nav>
        <ul>
          <li><Link to="/">List</Link></li>
          <li><Link to="/insert">Insert</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  </div>
)};
