const axios = require('axios');

const endPoint = 'https://cv-service-kej.cognitiveservices.azure.com/vision/v3.2/ocr';
const apiKey = '7a6caf81470a47e2a33fa5069d395e35';
const imgUrl = 'https://support.ramp.com/hc/article_attachments/29785837378195';

const options = {
  method: 'POST',
  url: endPoint,
  params: {
    language: 'unk',
    detectOrientation: true,
  },
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/json',
  },
  data: {url: imgUrl}
}

async function fetchData() {
  try{
    const res = await axios(options);
    const regions = res.data.regions;
    regions.forEach(region => {
      region.lines.forEach(line => {
        const words = line.words.map(word =>word.text);
        const strWords = words.join(" "); // join 배열을 문자열로 반환
        console.log(strWords);
      })
    });
    
  } catch(err) {
    console.log(err.message);
  }
}

fetchData();