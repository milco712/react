import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';

export const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  </div>
);}
