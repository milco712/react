import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/collections";

export const List = () => {
  const list = useTracker(() => {
    return Posts.find({}, { sort: { modifiedAt: -1 } }).fetch();
  });

  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <div>{item.title}</div>
            <div>
              <div>{item.tags.map((tag) => "#" + tag + " ")}</div>
              <div>마지막 수정: {item.modifiedAt.toLocaleDateString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
