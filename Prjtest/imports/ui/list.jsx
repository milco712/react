import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/collections";
import { Link } from "react-router-dom";

export const List = () => {
  const list = useTracker(() => {
    return Posts.find({}, { sort: { updatedAt: -1 } }).fetch();
  });

  console.log(list[0]);
  return (
    <div>
      <div>
        <span>총 {list.length} 건</span>
        <Link to="/add">Add Post</Link>
      </div>
      <ul>
        {list.map((post) => (
          <li key={post._id}>
            <Link to={`/detail/${post._id}`}>
              <div>{post.title}</div>
              <div>{post.tags.map((tag) => "#" + tag + " ")}</div>
              <div>
                <span>{post.isPublic === false ? "공개" : "비공개"}</span>
                <span>마지막 수정: {post.updatedAt.toLocaleDateString()}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
