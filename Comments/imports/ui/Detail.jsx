import React, { useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Posts, Comments, Comments2 } from "../api/collections";

export default () => {
  const refComment = useRef(null);
  const refComment2 = useRef(null);

  useTracker(() => {
    return Posts.find().fetch();
  });

  const post_id = useParams("_id");
  const post = Posts.findOne(post_id);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleComment = () => {
    const obj = {
      comment: refComment.current.value,
      createdAt: new Date(),
    };
  };

  const handleComment2 = () => {
    const obj = {
      comment: refComment2.current.value,
      createdAt: new Date(),
    };
  };

  const handleRemoveC = (c_id) => {
    Meteor.call("removeC", c_id, (err, rslt) => {});
  };

  const handleRemoveCC = (c_id) => {
    Meteor.call("removeCC", c_id, (err, rslt) => {});
  };
  return (
    <div>
      <div>title: {post.title} </div>
      <div>content: {post.content}</div>
      <div>date: {post.createdAt.toLocalString()} </div>
      <hr />
      <div>
        <input type="text" ref={refComment} />
        <button onClick={() => handleComment(post._id)}>add</button>
      </div>
      <hr />
      <div>
        {Comments.find().map((commt) => {
          return (
            <div key={commt._id} ref={refComment2}>
              {commt.comment}
              <button onClick={() => handleRemoveC(commt._id)}>delete</button>
              <input id={commt._id} type="text" />
              <button onClick={() => handleComment2(commt._id)}>add</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
