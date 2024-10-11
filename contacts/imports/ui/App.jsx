import React, { useState, useRef, useEffect } from 'react';

export const App = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const [contacts, setContacts] = useState([]);
 
  const fetchAll = () => {
    // contact.fetch라는 API 사용(서버도 한 프로젝트안에 있기에 api 이름만 사용)
    // 통신이 완료되면 콜백함수에 '에러', '결과'에 담아짐
    Meteor.call("contacts.fetch", (error, result) => {
      if(error) {
        alert(error);  
      }
      setContacts(result); // 비동기
      nameRef.current.value = "";
      phoneRef.current.value = "";
      nameRef.current.focus();
    });
  }

  useEffect(()=>{ // 비동기
    fetchAll();
  }, []);
  
  const addContact = (e) => {
    e.preventDefault();
    console.log("clicked");
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    if (name && phone) {
      Meteor.call("contacts.insert", name, phone, (error, result)=> {
        if (error) {
          console.log("Error:", error);
        }
        console.log("Result:", result);
        fetchAll();
        // const newContact = {
        //   _id: result,
        //   name: name,
        //   phone: phone
        // }
        // setContacts([...contacts, newContact]);
      });
    }
  };

  const removeContact = (contactId) => {
    Meteor.call("contacts.remove", contactId, (error) => {
      if(error){
        console.log("Error:", error);
      }
      fetchAll();
    })
  };

  return (
    <div>
      <h1>연락처 목록</h1>
      <form onSubmit={addContact}>
        <input type="text" ref={nameRef} placeholder="이름" />
        <input type="text" ref={phoneRef} placeholder="전화번호" />
        <button type="submit">추가</button>
      </form>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name}: {contact.phone}
            <button onClick={()=> removeContact(contact._id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
  

