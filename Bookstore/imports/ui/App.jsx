import React, { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [books, setBooks] = useState([]);
  const [pbooks, setPbooks] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const priceRef = useRef(null);
  let total = 0;

  // 전체 목록 가겨오기
  const fetchAll = () => {
    Meteor.call("books.fetch", (error, result) => {
      if (error) {
        console.error("Error fetching", error.reason);
      }
      setBooks(result);
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // 구매 금액
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < pbooks.length; i++) {
      total += parseFloat(pbooks[i].price);
    }
    setPurchasePrice(total);
  }, [pbooks]);

  // 책 추가
  const addBook = (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const author = authorRef.current.value.trim();
    const price = priceRef.current.value.trim();

    if (title && author && price) {
      Meteor.call("books.add", title, author, price, (error) => {
        if (error) {
          console.error("Error adding", error.reason);
        }
        fetchAll();
      });
    }
  };

  // 책 삭제
  const remove = (bookId) => {
    Meteor.call("books.remove", bookId, (error) => {
      if (error) {
        console.error("Error adding", error.reason);
      }
      fetchAll();
    });
  };

  // 장바구니 추가
  const purchase = (pbook) => {
    setPbooks((prev) => [...prev, pbook]);
  };

  // 장바구니 삭제
  const cancel = (pbookId) => {
    setPbooks((prev) => prev.filter((pbook) => pbook._id !== pbookId));
  };

  return (
    <div>
      <form onSubmit={addBook}>
        <label>
          Title: <input type="text" ref={titleRef} />
        </label>
        <label>
          Author: <input type="text" ref={authorRef} />
        </label>
        <label>
          Price: <input type="text" ref={priceRef} />
        </label>
        <button type="submit">Add</button>
      </form>
      <hr />
      <h3>책 목록</h3>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} / {book.author} / {book.price}
            <button onClick={() => purchase(book)}>구매</button>
            <button onClick={() => remove(book._id)}>삭제</button>
          </li>
        ))}
      </ul>

      <hr />
      <h3>장바구니</h3>
      <ul>
        {pbooks.map((pbook) => (
          <li key={pbook._id}>
            {pbook.title} / {pbook.author} / {pbook.price}
            <button onClick={() => cancel(pbook._id)}>삭제</button>
          </li>
        ))}
      </ul>
      <hr />
      <p>구매 금액: {purchasePrice}</p>
    </div>
  );
};
