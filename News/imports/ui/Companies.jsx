import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Companies } from "/imports/api/collections";

export default () => {
  const companies = useTracker(() => {
    return Companies.find().fetch();
  });
  return (
    <div>
      {companies.map((comp) => {
        return (
          <div key={comp._id}>
            <a href={`/companiesNews/${comp._id}`}>{comp.name}</a>
          </div>
        );
      })}
    </div>
  );
};
