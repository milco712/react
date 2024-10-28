const axios = require('axios');

const endPoint = 'https://api.cognitive.microsofttranslator.com/translate';
const apiKey = '19e997764b934ace8529f657bc9308cc';
const region = 'eastus';
const text = [
  {'text': '안녕하세요' }
];

// const options = {
//   method: 'POST',
//   url: endPoint,
//   parmas: {
//     'api-version' : 3.0,
//     'to': 'en'
//   },
//   headers: {
//     'Ocp-Apim-Subscription-Key': apiKey,
//     'Ocp-Apim-Subscription-Region': region,
//     'Content-Type': 'application/json',
//   },
//   data: text
// }


// axios(options).then((res) => {
//   const data = res.data;
//   console.log(data);
// }).catch((err)=> {
//   console.log(err.message);
// })


function translateText() {
  axios.post(endPoint, text, {
    parmas: {
      'api-version' : 3.0,
      'to': 'en'
    },
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Ocp-Apim-Subscription-Region': region,
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> {
    console.log(res.data);
  })
  .catch((err)=> {
    '요청 중 오류 발생', err.response ? err.response.data : err.message
  });
}

translateText();

