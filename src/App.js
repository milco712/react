import React from "react";
<<<<<<< Updated upstream
// import {Routes, Route, Link} from "react-router-dom";

import ArrayList from "./pages/Array-click";
=======
import {Routes, Route, Link} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";
import Input from "./pages/Input";
import Input2 from "./pages/Input2";
import UserList from "./pages/List";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
        <ArrayList />
=======
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/counter">Counter</Link> | <Link to="/input">Input</Link> | <Link to="/input2">Input2</Link> | <Link to="/list">List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/input" element={<Input />} />
          <Route path="/input2" element={<Input2 />} />
          <Route path="/list" element={<UserList />} />
        </Routes>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
