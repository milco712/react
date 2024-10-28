const axios = require("axios");

const endPoint =
  "https://langservice-kej.cognitiveservices.azure.com/text/analytics/v3.1/sentiment";
const apiKey = "ffb78866b431414ca1052c32d0388325";
const data = {
  documents: [
    {
      id: 1,
      language: "ko",
      text: "오늘 날씨가 좋아서 나가서 놀거예요. 바람이 많이 안 불면 좋겠어요",
    },
    {
      id: 2,
      language: "ko",
      text: "오늘 날씨가 흐려서 기분이 별로예요. 그래서 집에서 커피마시면서 책을 읽을거예요",
    },
  ],
};

const options = {
  method: "POST",
  url: endPoint,
  headers: {
    "Ocp-Apim-Subscription-Key": apiKey,
    "Content-Type": "application/json",
  },
  data: data,
};

axios(options)
  .then((res) => {
    const docu = res.data.documents;
    docu.forEach((d) => {
      let sentiment = d.sentiment;
      if (sentiment === "positive") {
        console.log("Good", d.confidenceScores.positive);
      } else {
        console.log("Sad", d.confidenceScores.negative);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
