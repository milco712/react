const axios = require('axios');

const endPoint = 'https://azais-kej.cognitiveservices.azure.com/vision/v3.2/ocr';
const apiKey = 'c90816ac3d644d828c0e31660f14288c';
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


axios(options).then((res) => {
  const regions = res.data.regions;
  console.log(regions.forEach(
    (region)=> console.log(region.lines.forEach(line => {
      const words = line.words.map(word => word.text);
      const strWords = words.join(' ');
      console.log('Extracted text: ', strWords);
    }))
  ));
}).catch((err)=> {
  console.log(err.message);
})