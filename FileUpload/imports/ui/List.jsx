import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Files } from "../api/collections";
import { useParams } from "react-router-dom";

export const List = () => {
  useTracker(() => {
    return [Files.find().fetch()];
  });

  return (
    <div>
      {Files.find().fetch().map((file) => {
        return (
          <li>
            <img src={file.findOne(file._id).link()} alt="" />
          </li>
        );
      })}
    </div>
  );
};
