import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

export const Detail = () => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  const getDetail = (id) => {
    Meteor.call("post.detail", id, (err, rslt) => {
      if ( err ) {
        console.error("Error getting detail", err);
      }
      setDetail(rslt);
    });
  }

  useEffect(() => {
    getDetail(id);
  }, [id]);

  return (
    <>
      <div>
        <h1>{detail.title}</h1>
        <div>
          <span>{detail.authorId}</span>
          <span>{detail.modifiedAt.toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
};
