import React from "react";
import { Files } from "../api/collections";
import { useTracker } from "meteor/react-meteor-data";

export default () => {
  const imgSrc = () => {
    const loginUser = Meteor.user();
    const profile_image_id = loginUser.profile.profile_image_id;
    const file = Files.findOne(profile_image_id);
    return file ? file.link() : null;
  };

  const imgLink = useTracker(() => imgSrc());

  return (
    <div>
      <p>My profile image</p>
      <img src={imgLink} alt="" />
    </div>
  );
};
