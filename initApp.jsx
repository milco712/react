import React, { useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/">home</Link>
          <Link to="/detail">detail</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
};
