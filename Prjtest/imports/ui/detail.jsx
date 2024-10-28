import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    Meteor.call("post.detail", id, (err, rslt) => {
      if (err) {
        console.error("Error getting detail", err);
      }
      setDetail(rslt);
    });
  }, [id]);

  if (!detail) return <div>Loading ...</div>;

  return (
    <>
      <h1>{detail.title}</h1>
      <div>
        <span>By. {detail.authorId} / </span>
        <span>마지막 수정. {detail.modifiedAt.toLocaleDateString()}</span>
      </div>
      <hr />
      <div>
        <h3>{detail.secTitle}</h3>
        <div>{detail.secContent}</div>
      </div>
      <div>{detail.tags.map((t) => t + "  ")}</div>
      <hr />
      <div>
        <button>좋아요 {detail.likesCount}</button>
        <button>북마크</button>
        <button>수정</button>
        <button>삭제</button>
        <button>목록</button>
      </div>
    </>
  );
};
