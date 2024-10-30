import React, { useEffect, useRef, useState } from "react";
import { Posts, Sections } from "../api/collections";

export const AddPost = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [inputs, setInputs] = useState([{ title: "", content: "" }]);
  const refTitle = useRef(null);
  const refTags = useRef(null);

  const getTitleValue = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].title = value;
    setInputs(newInputs);
  };

  const getContentValue = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].contnet = value;
    setInputs(newInputs);
  };

  const addPost = (e) => {
    e.preventDefault();
    const title = refTitle.current.value.trim();
    const tags = refTags.current.value.trim();

    let setTit, setCont;
    inputs.forEach((input, idx) => {
      setTit = input.title;
      setCont = input.content;
      console.log(setTit, setCont, idx);
    });

    if (title && tags) {
      // post 넣기
      Posts.insert(
        {
          authorId: "admin",
          createdAt: new Date(),
          modifiedAt: new Date(),
          title,
          tags: tags.split(","),
          likesCount: 0,
          isArchive: false,
          isPrivate,
        },
        (err, rslt) => {
          if (err) {
            console.error("Error inserting post", err.message);
          }
          // section 넣기 inputs는 배열
          inputs.forEach((input) => {
            Sections.insert(
              {
                postId: rslt,
                modefiedAt: new Date(),
                title: input.title,
                content: input.content,
              },
              (err) => {
                if (err) {
                  console.error("Error inserting section", err.message);
                }
                alert("Added!");
              }
            );
          });
        }
      );
    }
  };

  const addSection = () => {
    setInputs([...inputs, { title: "", content: "" }]);
  };

  const deleteSection = (idx) => {
    const newInput = inputs.filter((_, index) => index !== idx);
    setInputs(newInput);
  };

  return (
    <>
      <form onSubmit={addPost}>
        <input type="text" ref={refTitle} placeholder="title" /> <br />
        <button onClick={() => addSection()}>add section</button>
        {inputs.map((input, idx) => (
          <div key={idx}>
            <input
              type="text"
              value={input.title}
              onChange={(e) => getTitleValue(idx, e.target.value)}
              placeholder="section title"
            />
            <br />
            <textarea
              value={input.content}
              placeholder="section content"
              onChange={(e) => getContentValue(idx, e.target.value)}
            ></textarea>
            {idx !== 0 ? (
              <button
                onClick={() => {
                  deleteSection(idx);
                }}
              >
                delete section {idx}
              </button>
            ) : undefined}
          </div>
        ))}
        <input type="text" ref={refTags} placeholder="tags" />
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
