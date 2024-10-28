const axios = require("axios");

const endPoint =
  "https://langservice-kej.cognitiveservices.azure.com/text/analytics/v3.1/entities/recognition/general";
const apiKey = "ffb78866b431414ca1052c32d0388325";
const text = {
  documents: [
    {
      id: 1,
      language: "en",
      text: "today weather is good so I gonna go out",
    },
    {
      id: 2,
      language: "en",
      text: "I'd like to have a latte and read a book",
    },
  ],
};

async function entities() {
  try {
    const res = await axios.post(endPoint, text, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/json",
      },
    });
    const docu = res.data.documents;
    docu.forEach((d, idx) => {
      let text, category;
      d.entities.map((e) => {
        text = e.text;
        category = e.category;
      });
      console.log(idx + 1, "text:", text, "category:", category);
    });
  } catch (err) {
    console.log(err.message);
  }
}

entities();
