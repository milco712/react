import React from "react";
import { useParams } from 'react-router-dom';
import { Posts } from "../api/collections";


export const Detail = () => {

  const { id } = useParams();
  return (
    <>
      <div>
        <h2>상세 페이지</h2>
        <p>아이템 ID: {id}</p>
      </div>
    </>
  );
};
