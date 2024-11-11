import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Files } from "../api/collections";

export default () => {
  useTracker(() => {
    return [Files.find().fetch()];
  });

  return (
    <div>
      <ul>
        {Files.find()
          .fetch()
          .map((file) => {
            return (
              <li key={file._id}>
                <img src={Files.findOne(file._id).link()} alt="" />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
