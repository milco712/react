const axios = require('axios');

const endPoint = 'https://azais-kej.cognitiveservices.azure.com/vision/v3.2/analyze';
const apiKey = 'c90816ac3d644d828c0e31660f14288c';
const imgUrl = 'https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/72BT8VqmpWIWEVRzEhTgKB.jpeg';

const options = {
  method: 'POST',
  url: endPoint,
  params: {
    visualFeatures: "Description"
  },
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/json',
  },
  data: {url: imgUrl}
}


axios(options).then((res) => {
  const desc = res.data.description;
  desc.captions.map(capt => console.log(capt.text))
}).catch((err)=> {
  console.log(err.message);
})

const x= 1;
function outer (){
  const x = 10;
  const inner = function () {
    console.log(x);
  }
  return inner;
}

const innerFunc = outer();
innerFunc();