const axios = require("axios");

const endPoint =
  "https://langservice-kej.cognitiveservices.azure.com/language/:analyze-conversations";
const apiKey = "ffb78866b431414ca1052c32d0388325";
const reqId = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
const data = {
  kind: "Conversation",
  analysisInput: {
    conversationItem: {
      id: "kejreq",
      text: "turn on the light",
      modality: "text",
      language: "en",
      participantId: "user1",
    },
  },
  parameters: {
    projectName: "home_automation",
    verbose: true,
    deploymentName: "home_auto",
    stringIndexType: "TextElement_V8",
  },
};

const options = {
  method: "POST",
  url: endPoint,
  params: {
    "api-version": "2022-10-01-preview",
  },
  headers: {
    "Ocp-Apim-Subscription-Key": apiKey,
    "Apim-Request-Id": reqId,
    "Content-Type": "application/json",
  },
  data: data,
};

axios(options)
  .then((res) => {
    const data = res.data;
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });
