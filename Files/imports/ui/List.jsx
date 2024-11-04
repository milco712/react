import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Files } from "/imports/api/Files.js";

export default () => {
  useTracker(() => {
    return [Files.find().fetch()];
  });

  Files.find().each((file) => {
    console.log(file.link);
  });
  return (
    <div>
      <h3>Uploaded Files</h3>
      <ul>
        {Files.find().map((file) => {
          console.log(file.link);
          return (
            <li key={file._id}>
              <a
                href={Files.findOne(file._id).link()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
