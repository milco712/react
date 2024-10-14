import React, {useState, useEffect} from 'react';

export const App = () => {

  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");


  useEffect(()=>{
    Meteor.call("quotes.fetch", (error, result) => {
      if(error) {
        console.error("명언 가져오는 중 에러: ", error.reason);
      } else {
        setQuotes(result);
      }
    })
  }, []);

  const getRandomQuotes = () => {
    if(quotes.length > 0) {
      const randomIdx = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIdx].text);
    }
  }
  

  return (
    <div>
      <h1>랜덤 명언 표시기</h1>
      <button onClick={getRandomQuotes}>새로운 명언</button>
      {quote && <p>{quote}</p>}
    </div>
  );
} 
