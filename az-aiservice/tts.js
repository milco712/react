const axios = require('axios');
const fs = require('fs');


const region = 'eastus';
const endPoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
const apiKey = '5276fc336b2342a8baab3b566cb4c134';
const txt = '어렵다 클로저';
const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <voice name="ko-KR-InJoonNeural">
        <prosody rate="medium" pitch="default">${txt}</prosody>
      </voice>
    </speak>
  `


function convertTextToSpeech() {
  axios.post(endPoint, ssml, {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'riff-16khz-16bit-mono-pcm',
    },
    responseType: 'arraybuffer',
  })
  .then((res)=> {
    fs.writeFileSync('output1.wav', res.data);
    console.log('TTS 파일이 성공적으로 저장되었습니다.');
  })
  .catch((err)=> {
    'TTS 요청 중 오류 발생', err.response ? err.response.data : err.message
  });
}

convertTextToSpeech();



