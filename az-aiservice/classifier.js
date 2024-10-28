const axios = require('axios');

const endPoint = 'https://animalclassifierkej-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/11bb3308-28b2-4daf-bce0-9b728fdf7f6c/classify/iterations/Iteration1/url';
const apiKey = 'd451f0e01d1140a097b793f658bf6b05';
const imgUrl = 'https://cdn.crowdpic.net/detail-thumb/thumb_d_C53E0519F77B8B1194106CF62AEF7616.jpg';

const options = {
  method: 'POST',
  url: endPoint,
  params: {
    language: 'unk',
    detectOrientation: true,
  },
  headers: {
    'Prediction-Key': apiKey,
    'Content-Type': 'application/json',
  },
  data: {Url: imgUrl}
}

async function fetchData() {
  try{
    const res = await axios(options);
    const predictions = res.data.predictions;
    predictions.forEach(prediction => {
      console.log(prediction.tagName,": ",prediction.probability);
    })
  } catch(err) {
    console.log(err.message);
  }
}

fetchData();


