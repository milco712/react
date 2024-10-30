import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Companies from "./Companies";
import CompaniesNews from "./CompaniesNews";

export const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">home</Link>
        <Link to="/companies">companies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companiesNews/:company_id" element={<CompaniesNews />} />
        <Route path="/detail/:news_id" element={<Detail />} />
      </Routes>
    </Router>
  );
};
