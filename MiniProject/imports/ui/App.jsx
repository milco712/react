import React, {useEffect, useState, useRef} from "react";

export const App = () => {

  const [books, setBooks] = useState([]);
  const [pBooks, setPBooks] = useState([]);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const priceRef = useRef(null);


  // 책 정보 가져오기
  const fetchAll = () => {
    Meteor.call("books.fetch", (error, result)=> {
      if (error){
        console.error("Error getting: ", error.reason);
      } else {
        setBooks(result);
      }
    });
  }

  useEffect(() => {
    fetchAll();
  },[]);



  // 책 정보 등록하기
  const addBookInfo = (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const author = authorRef.current.value.trim();
    const price = priceRef.current.value.trim();
    
    if ( title && author && price) {
      Meteor.call("books.add", title, author, price, (error)=> {
        if (error){
          console.error("Error adding: ", error.reason);
        } else {
          titleRef.current.value = "";
          authorRef.current.value = "";
          priceRef.current.value = "";
          fetchAll();
        }
      });
    }
    
  };

  // 책 정보 삭제하기
  const deleteBook = (bookId) => {
    Meteor.call("books.remove", bookId, (error)=> {
      if (error){
        console.error("Error removing: ", error.reason);
      } else {
        fetchAll();
      }
    });
  }

  // 장바구니 추가
  const purchaseBook = (pbook) => {
    setPBooks((prev) => [...prev, pbook]);
  }

  // 장바구니 삭제
  const cancelPurchase = (pbook) => {
    setPBooks((prev) => prev.filter((book) => book._id !== pbook._id))
  }


  return (
    <div>
      <form onSubmit={addBookInfo}>
        <label htmlFor="">
          제목: 
          <input type="text" ref={titleRef} />
        </label>
        <label htmlFor="">
          저자명: 
          <input type="text" ref={authorRef} />
        </label>
        <label htmlFor="">
          가격: 
          <input type="text" ref={priceRef} />
        </label>
        <button type="submit">등록</button>
      </form>
      <hr /> 
      <ul>
        <h4>장바구니</h4>
        {
          pBooks.map((pbook)=> (
            <li key={pbook._id}>
              {pbook.title} / {pbook.author} / {pbook.price}
              <button onClick={() => cancelPurchase(pbook)}>삭제</button>
            </li>
          ))
        }
      </ul>
      <hr />
      <ul>
        <h4>책 목록</h4>
        {
          books.map((book)=> (
            <li key={book._id}>
              {book.title} / {book.author} / {book.price}
              <button onClick={() => deleteBook(book._id)}>삭제</button>
              <button onClick={() => purchaseBook(book)}>구매</button>
            </li>
          ))
        }
      </ul>
      <hr />
      <div>
        총 금액 : {
          books.reduce((total, book)=> (
            total + parseFloat(book.price)
          ),0)
        }
      </div>
    </div>
  );
};
