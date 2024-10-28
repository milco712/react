import React, { useRef, useState } from "react";
import { Posts } from "../api/collections";

export const AddPost = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const titleRef = useRef(null);
  const secTitRef = useRef(null);
  const secContRef = useRef(null);
  const tagRef = useRef(null);

  const addPost = (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const secTitle = secTitRef.current.value.trim();
    const secContent = secContRef.current.value.trim();
    const tags = tagRef.current.value.trim();

    if (title && secContent && tags) {
      return Posts.insert({
        authorId: "admin",
        createdAt: new Date(),
        modifiedAt: new Date(),
        title,
        secTitle,
        secContent,
        tags: tags.split(","),
        likesCount: 0,
        isArchive: false,
        isPrivate,
      });
    }
  };

  return (
    <>
      <form onSubmit={addPost}>
        <input type="text" ref={titleRef} placeholder="title" />
        <div>
          <div>
            <input type="text" ref={secTitRef} placeholder="sub title" />
          </div>
          <div>
            <textarea ref={secContRef} placeholder="content"></textarea>
          </div>
        </div>
        <div>
          <input type="text" ref={tagRef} placeholder="tags" />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            비공개
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};
