import React, { useEffect, useState } from 'react';

export const List = () => {
  const [list, setList] = useState([]);

  const fetchAll = () => {
    Meteor.call("posts.fetch", (error, result) => {
      if(error) {
        console.error("Error fetching: ", error);
      }
      setList(result);
    });
  };

  useEffect(() => {
    fetchAll();
  },[]);


  return (
    <>
      <ul>
        {
          list.map((item) => (
            <li key={item._id}>
              <div>{item.title}</div>
              <div>
                <div>
                  {item.tags.map((tag => "#"+tag+" "))}
                </div>
                <div>마지막 수정: {item.modifiedAt.toLocaleDateString()}</div>
              </div>
            </li>
          ))
        }
      </ul>
    </> 
  );
};
