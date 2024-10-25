import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/collections";
import { Link } from 'react-router-dom';


export const List = () => {
  const list = useTracker(() => {
    return Posts.find({}, { sort: { modifiedAt: -1 } }).fetch();
  });

  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <Link to={`/detail/${item._id}`}>{item.title}</Link>

            <div>
              <div>{item.tags.map((tag) => "#" + tag + " ")}</div>
              <div>마지막 수정: {item.modifiedAt.toLocaleDateString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
