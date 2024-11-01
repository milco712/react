import React, { useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Posts } from "../api/collections";

export default () => {
  useTracker(() => {
    return Posts.find().fetch();
  });

  return <div></div>;
};
