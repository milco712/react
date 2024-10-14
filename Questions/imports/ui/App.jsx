import React, {useState, useEffect} from 'react';

export const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(()=> {
    Meteor.call("questions.fetch", (error, result) => {
      if(error) {
        console.error("질문 가져오는 중 에러 발생: ",error.reason);
      }
      setQuestions(result);
    });
  }, []);

  const handleAnswerClink = (selectedOption)=> {
    if(selectedOption === questions[currentQuestionIdx].answer) {
      setScore(score+1);
    }

    const nextQuestion = currentQuestionIdx +1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIdx(nextQuestion)
    } else {
      setShowScore(true);
    }
  }

  if(questions.length === 0){
    return <p>loading...</p>;
  }
  

  return (
    <div>
      <h1>퀴즈 앱</h1>
      { showScore ? (
        <p>당신의 점수는 {score}입니다.</p>
      ) : (
        <>
          <p>{questions[currentQuestionIdx].question}</p>
          {questions[currentQuestionIdx].options.map((opt)=> (
            <button onClick={()=> handleAnswerClink(opt)} key={opt}>{opt}</button>
          ))}
        </>
      )}
    </div>
  );
}
