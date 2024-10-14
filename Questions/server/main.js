import { Questions } from "../imports/api/collections";

Meteor.methods({
  "questions.fetch"() {
    return Questions.find().fetch();
  },
});

// Questions.remove({});
// Questions.insert({
//   question: "1. React는 무엇을 만들기 위한 Javascript 라이브러리인가?",
//   options: ["데이터베이스", "사용자 인터페이스", "서버", "모바일앱"],
//   answer: "사용자 인터페이스"
// })

if (Questions.find().count() === 0) {
  const initialQuestions = [
    {
      question: "1. React는 무엇을 만들기 위한 Javascript 라이브러리인가?",
      options: ["데이터베이스", "사용자 인터페이스", "서버", "모바일앱"],
      answer: "사용자 인터페이스",
    },
    {
      question: "2. 질문?",
      options: ["옵션1", "옵션2", "옵션3", "옵션4"],
      answer: "옵션2",
    },
    {
      question: "3. 질문?",
      options: ["옵션1", "옵션2", "옵션3", "옵션4"],
      answer: "옵션4",
    },
  ];
  
  initialQuestions.forEach((q) => {
    Questions.insert(q);
  });
}



const rslt = Questions.find({},{sort: {question: -1}}).fetch();
console.error("result: ", rslt);