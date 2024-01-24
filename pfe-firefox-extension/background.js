import { loadData } from './storageModule.js';

async function logJoinedRace(requestDetails) {
  // Check if the URL contains 'register' at any position (not just at index 1)
  if ((requestDetails.method === 'POST' && 
        requestDetails.url && 
        requestDetails.url.indexOf("registration") > -1 && 
        requestDetails.url.indexOf("join") > -1)) {

      console.log("Found registration URL");
      const requestBody = requestDetails.requestBody;
      // Assuming requestBody.raw contains the JSON data
      const decodedData = new TextDecoder("utf-8").decode(requestBody.raw[0].bytes);
      const jsonData = JSON.parse(decodedData);

      const loadedData = await loadData('stable_id');
      const loadedvalidation_code = await loadData('validation_code');

      try {
        console.log("requestDetails.documentUrl", requestDetails.documentUrl);
        console.log("requestDetails.url", requestDetails.url);
        console.log("requestDetails.url", requestDetails.originUrl);
      } catch (error) {
        console.error(error);
      }

      try {
        console.log(JSON.parse(requestDetails))
      } catch (error) {
        console.error(error);
      }

      try {
        console.log("requestBody", jsonData);
      } catch (error) {
        console.error(error);
      }

      try {
        console.log("requestDetails", requestDetails);
      } catch (error) {
        console.error(error);
      }

      const data = {
        'url': requestDetails.url,
        'documentUrl': requestDetails.documentUrl,
        'originUrl': requestDetails.originUrl,
        'stable_id': loadedData,
        'verification_code': loadedvalidation_code,
        'horse_id': jsonData,
        'type': 'horse_registration'
      };

      postData('https://cjsbc9npme.execute-api.us-east-2.amazonaws.com/dev/horseregistration', data)
      .then((data) => {
          console.log('Success:', data); // JSON data parsed by `response.json()` call
      });
  }
}

async function postData(url, data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json();
  } catch (error) {
    return console.error('Error:', error);
  }
}

const api = browser || chrome;

console.log("Registering listener");

api.webRequest.onBeforeRequest.addListener(
  logJoinedRace,
  { urls: ["*://*.photofinish.live/*", "*://photofinishedge.com/*"] },
  ["blocking", "requestBody"]
);