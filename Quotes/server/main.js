import { Quotes } from "../imports/api/collections";

Meteor.methods({
  "quotes.fetch"() {
    return Quotes.find().fetch();
  },
});

if(Quotes.find().count() === 0) {
  const initialQuotes = [
    "성공은 실패를 거듭하면서도 열정을 잃지 않는 것이다.",
    "삶이란 자신을 찾는 것이 아니라, 자신을 창조하는 것이다.",
    "어제보다 나은 내가 되기 위해 노력하라. 남과의 비교는 필요 없다.",
    "가장 어두운 밤이 지나야 가장 밝은 새벽이 온다.",
    "작은 일에 충실하라. 거기서 당신의 힘이 나온다.",
  ];

  initialQuotes.forEach((q)=> {
    Quotes.insert({ text: q})
  })
}

Quotes.find().forEach((q)=> {
  console.log(q);
});