require("dotenv").config();
const axios = require("axios");

const jsonboxID = process.env.JSONBOX_ID;
const frequency = "2000";
const message = {
  device: process.env.DEVICE,
  timestamp: new Date().toLocaleString(),
};

const ping = () => {
  axios
    .post(`https://jsonbox.io/${jsonboxID}`, message, {
      headers: { "content-type": "application/json" },
    })
    .then(function (response) {
      console.log(response.status, new Date(), message.device);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

setInterval(ping, frequency);
