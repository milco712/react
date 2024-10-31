import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export const App = () => {
  const [rslt, setRslt] = useState("스캔해주세요");
  const refBarcode = useRef(null);

  const handleScan = () => {
    const number = refBarcode.current.value;
    Meteor.call("scan", number, (err, rslt) => {
      setRslt(rslt);
    });
  };

  return (
    <div>
      <input type="text" ref={refBarcode} />
      <button onClick={handleScan}>Check</button>
      <div>{rslt}</div>
    </div>
  );
};
