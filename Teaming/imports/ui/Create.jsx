import React, { useRef } from "react";
import { Projects } from "../api/collections";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const refTitle = useRef(null);

  const handleCreate = () => {
    const obj = {
      createdAt: new Date(),
      title: refTitle.current.value,
      user_id: Meteor.user()._id,
    };

    Projects.insert(obj);
    navigate("/");
  };

  return (
    <div>
      <div>
        title: <input type="text" ref={refTitle} />
      </div>
      <div>
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};
