import React, { useState, useRef } from 'react';

export const App = () => {

  const amountRef = useRef(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setloading] = useState(false);
  const convertCurrency = (e) => {
    e.preventDefault();
    const amount = parseFloat(amountRef.current.value);
    if (!amount) {
      alert("유효한 금액을 입력하세요.");
      return;
    }

    setloading(true);
    Meteor.call("exchangeRates.get", "USD", (err, data)=> {
      if (err) {
        setloading(false);
        return alert(err);
      }
      const rate = data.rates["KRW"];
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
      setloading(false);
    })
  }


  return (
    <div>
      <h1>환율 계산기</h1>
      <form onSubmit={convertCurrency}>
        <input type="text" ref={amountRef} placeholder="금액 (USD)" step="any" />
        <button type="submit">변환</button>
      </form>

      {/* {loading && <p>환율 정보 가져오는 중...</p>}
      {!loading && <p>변환된 금액: {convertedAmount} KRW</p>} */}
      {loading ? (<p>환율 정보 가져오는 중...</p>) : (<p>변환된 금액: {convertedAmount} KRW</p>)}

    </div>
  );
} 
