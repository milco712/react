const axios = require('axios');

const endPoint = 'https://langservice-kej.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=MargiesTravelkej&api-version=2021-10-01&deploymentName=production';
const apiKey = 'ffb78866b431414ca1052c32d0388325';

const options = {
  method: 'POST',
  url: endPoint,
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/json',
  },
  data: {
      "top": 3,
      "question": "travel"
  }
}


axios(options).then((res) => {
  const data = res.data.answers;
  data.forEach(d => {
    const ques = d.questions.map(q => q); 
    const answer = "Q. "+ques+" => A. "+d.answer;
    console.log(answer);
  });
}).catch((err)=> {
  console.log(err.message);
})


