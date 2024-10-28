const axios = require('axios');

const endPoint = 'https://azml1-dfixr.eastus.inference.ml.azure.com/score';
const authKey = 'Bearer S03pvKdCRgOdFGPcjsxPB5g9V4rGb2As';
const bikeData =  {
  "input_data": {
    "columns": [
      "day",
      "mnth",
      "year",
      "season",
      "holiday",
      "weekday",
      "workingday",
      "weathersit",
      "temp",
      "atemp",
      "hum",
      "windspeed"
    ],
    "index": [0,1],
    "data": [[1,1,2022,2,0,1,1,2,0.3,0.3,0.3,0.3],[2,2,2023,2,0,1,1.1,1,0.3,0.1,0.2,0.2]]
  }
 }


const options = {
  method: 'POST',
  url: endPoint,
  headers: {
    'Authorization': authKey,
  },
  data: bikeData
}

// axios(options).then((res) => {
//   const data = res.data;
//   console.log(data);
// }).catch((err)=> {
//   console.log(err.message);
// })

async function fetchData() {
  try{
    const res = await axios(options);
    const data = res.data;
    console.log(data);
  } catch(err) {
    console.log(err.message);
  }
}

fetchData();