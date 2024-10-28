const axios = require("axios");

const endPoint =
  "https://langservice-kej.cognitiveservices.azure.com/text/analytics/v3.1/entities/linking";
const apiKey = "ffb78866b431414ca1052c32d0388325";
const text = {
  documents: [
    {
      id: 1,
      language: "en",
      text: "Science laboratories across disciplines—chemistry, biochemistry and materials science—are on the verge of a sweeping transformation as robotic automation and AI lead to faster and more precise experiments that unlock breakthroughs in fields like health, energy and electronics.",
    },
    {
      id: 2,
      language: "en",
      text: "Training scientists to work with advanced automation systems is equally important. Researchers will not only need to develop expertise in their scientific fields but also understand the capabilities of robots, data science and AI to accelerate their research. Educating the next generation of scientists to collaborate with engineers and computer scientists will be essential for realizing the full potential of automated laboratories.",
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
      d.entities.forEach((e) => {
        const t = e.matches.map((m) => m.text);
        console.log(t.join(), ": ", e.url);
      });
    });
  } catch (err) {
    console.log(err.message);
  }
}

entities();
