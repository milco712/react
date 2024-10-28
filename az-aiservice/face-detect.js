const axios = require('axios');
const fs = require('fs');

const endPoint = 'https://azais-kej.cognitiveservices.azure.com/face/v1.0/detect';
const apiKey = 'c90816ac3d644d828c0e31660f14288c';
const imgPath = './store-camera-1.jpg';
const imgBuffer = fs.readFileSync(imgPath); // 이미지 읽어서 binary로 만들기

const options = {
  method: 'POST',
  url: endPoint,
  params: {
    'returnFaceLandmarks': true,
    'returnFaceAttributes': 'glasses,accessories,noise,blur,exposure'
  },
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/octet-stream',
  },
  data: imgBuffer
}

axios(options).then((res) => {
  // console.log('얼굴인 인식되었습니다. ', res.data);
  const data = res.data;
  console.log(JSON.stringify(data.faceAttributes.blur));
}).catch((err)=> {
  console.log(err.message);
})