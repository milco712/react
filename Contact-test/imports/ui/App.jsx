import React, {useState, useEffect, useRef} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../api/collections';

export const App = () => {
  // const [list, setList]  = useState([]);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const list = useTracker(() => {
    return Contacts.find().fetch();
  })

  // const fetchAll = () => {
  //   Meteor.call("contacts.fetch", (error, result) => {
  //     if (error) {
  //       console.error(error.reason);
  //     }
  //     setList(result);
  //   })
  // }

  // useEffect(() => {
  //   fetchAll();
  // },[]);

  const addInfo = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    
    if(name && phone){
      Meteor.call("contacts.add", name, phone, (error) => {
        if (error) {
          console.error(error.reason);
        }
        fetchAll();
      })
    }
  };

  const deleteInfo = (id) => {
    Meteor.call("contacts.delete", id, (error) => {
      if (error) {
        console.error(error.reason);
      }
      fetchAll();
    })
  }
  


  return (
  <>
    <form onSubmit={addInfo}>
      <label>이름: <input type="text" ref={nameRef} placeholder='이름' /></label>
      <label>전화번호: <input type="text" ref={phoneRef} placeholder='전화번호' /></label>
      <button type='submit'>저장</button>
    </form>

    <ul>
      {list.map(item => (
        <li key={item._id}>
          {item.name} : {item.phone} <button onClick={()=> deleteInfo(item._id)}>삭제</button>
        </li>
      ))}
    </ul>
  </>
  );
};
