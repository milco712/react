import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Files } from "../api/collections";

export const List = () => {
  useTracker(() => {
    return [Files.find().fetch];
  });

  return (
    <div>
      {Files.find().map((file) => {
        return (
          <li>
            <img src={file.findOne(file._id).link()} alt="" />
          </li>
        );
      })}
    </div>
  );
};
