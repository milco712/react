const axios = require("axios");

const endPoint =
  "https://langservice-kej.cognitiveservices.azure.com/text/analytics/v3.1/keyPhrases";
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

async function keyPhrases() {
  try {
    const res = await axios.post(endPoint, text, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/json",
      },
    });
    const docu = res.data.documents;
    docu.forEach((d, idx) => {
      const key = d.keyPhrases.map((k) => k);
      const keys = key.join(", ");
      console.log(idx + 1, ". ", keys);
    });
  } catch (err) {
    console.log(err.message);
  }
}

keyPhrases();
