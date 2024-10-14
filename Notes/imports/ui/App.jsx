import React, {useRef, useState, useEffect, useTracker} from 'react';

export const App = () => {
  const [notes, setNotes] = useState([]);
  const inputRef = useRef(null);
  
  const fetchAll = () => {
    Meteor.call("notes.fetch",(error, result)=>{
      if(error) {
        console.error("Error notes fetching :", error.reason);
      } else {
        setNotes(result);
        console.log("result: ",result);
      }
      
    })
  }

  // const notes = useTracker(()=> {
  //   return Notes.find({},{sort: {createdAt: -1}}).fetch();
  // });
  
  const addNote = (e) => {
    e.preventDefault();
    const msg = inputRef.current.value.trim();
    if (msg) {
      Meteor.call("notes.insert", msg, (error)=> {
        alert("Error adding : ", error.reason);
      });
      inputRef.current.value = "";
    }
    fetchAll();
  }

  // const addNote2 = (e) => {
  //   e.preventDefault();
  //   const msg = inputRef.current.value.trim();
  //   if(msg) {
  //     Notes.insert({
  //       message: msg,
  //       createdAt: new Date();
  //     });
  //   }
  // }



  const removeNote = (noteId) => {
    Meteor.call("notes.remove", noteId, (error)=> {
      if(error){
        alert("Error removing: ", error.reason)
      }
      fetchAll();
    })
  }

  // const removeNote2 = (noteId) => {
  //   Notes.remove(noteId);
  // }

  useEffect(() => {
    fetchAll();
    console.log("초기화 완료");
  },[]);

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input type="text" ref={inputRef} placeholder='write memo' />
        <button type="submit">추가</button>
      </form>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            {n.message} / {n.createdAt.toLocaleString()}
            <button onClick={()=>removeNote(n._id)}>remove</button>
          </li>
        ))}
        </ul>
    </div>
  );
}

