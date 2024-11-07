import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Projects, Joins } from "../api/collections";
import { useNavigate, Link } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  [user] = useTracker(() => {
    return [Meteor.user()];
  });

  const joinBtn = (proj_id) => {
    // const joinInfo = Joins.findOne({ project_id: proj_id }).member;
    // console.log(joinInfo);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleLogout = () => {
    Meteor.logout();
  };

  return (
    <div>
      {Meteor.user() ? (
        <div>
          <div>
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            {Projects.find().map((proj) => {
              return (
                <div key={proj._id}>
                  <Link to="/detail/:id">{proj.title}</Link> /
                  {Meteor.users.findOne(proj.user_id).profile.nickname}
                  {joinBtn(proj._id)}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};
