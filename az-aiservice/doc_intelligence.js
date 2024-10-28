const axios = require("axios");
const fs = require("fs");

const endPoint =
  "https://eastus.api.cognitive.microsoft.com/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-07-31";
const apiKey = "cdc9ae9b8d40499b87dd9c7f1f690be0";
const imgFile = "./receipt.jpg";
const imgBuffer = fs.readFileSync(imgFile);
// const imgUrl = "https://i.redd.it/h2yx2wks8ew61.jpg";

async function analyzeDoc() {
  try {
    const res = await axios.post(endPoint, imgBuffer, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "image/jpg",
      },
    });
    const opLoc = res.headers["operation-location"];
    console.log("Operation-Location: ", opLoc);
    setTimeout((opLoc) => getResult(opLoc), 5000);
  } catch (err) {
    console.log(err.message);
  }
}

analyzeDoc();

async function getResult(endPoint) {
  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/json",
      },
    });
    const data = res.data;
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
