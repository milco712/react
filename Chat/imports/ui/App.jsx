import React, { useState, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Chats, Users } from "../api/collections";

export const App = () => {
  const refChat1 = useRef(null);
  const refChat2 = useRef(null);

  const chats = useTracker(() => {
    return Chats.find().fetch();
  });

  const handleChatSendUser1 = (e) => {
    e.preventDefault();
    console.log("send!");
    const chat = refChat1.current.value;
    Meteor.call("chatSend", chat, "user1", (err, rslt) => {
      console.log(rslt);
    });
  };

  const handleChatSendUser2 = (e) => {
    e.preventDefault();
    console.log("send!");
    const chat = refChat2.current.value;
    Meteor.call("chatSend", chat, "user2", (err, rslt) => {
      console.log(rslt);
    });
  };

  const handleRemoveChat = (chat_id) => {
    Chats.remove(chat_id);
  };

  return (
    <div>
      <form onSubmit={(e) => handleChatSendUser1(e)}>
        <input type="text" ref={refChat1} placeholder="User1" />
      </form>
      <form onSubmit={(e) => handleChatSendUser2(e)}>
        <input type="text" ref={refChat2} placeholder="User2" />
      </form>

      {chats.map((chat) => {
        return chat.user_id === "user1" ? (
          <div key={chat._id}>
            {chat.message} / {chat.user_id}
            <button
              onClick={() => {
                handleRemoveChat(chat._id);
              }}
            >
              X
            </button>
          </div>
        ) : (
          <div key={chat._id} style={{ float: "right" }}>
            {chat.message} / {chat.user_id}
          </div>
        );
      })}
    </div>
  );
};
