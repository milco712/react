import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Posts, Sections } from "../api/collections";

export const Detail = () => {
  const [post, setPost] = useState(null);
  const [section, setSection] = useState(null);
  const { id } = useParams();

  useTracker(() => {
    setPost(Posts.findOne({ _id: id }));
    setSection(Sections.findOne({ postId: id }));
  }, [id]);

  if (!post) return <div>Loading ...</div>;

  return (
    <>
      <h1>{post.title}</h1>
      <div>
        <span>By. {post.authorId} / </span>
        <span>마지막 수정. {post.modifiedAt.toLocaleDateString()}</span>
      </div>
      <hr />
      <h3>{section.title}</h3>
      <div>{section.content}</div>
      <hr />
      <div>{post.tags.map((t) => t + "  ")}</div>
      <hr />
      <div>
        <button>좋아요 {post.likesCount}</button>
        <button>북마크</button>
        <button>수정</button>
        <button>삭제</button>
        <button>목록</button>
      </div>
    </>
  );
};
