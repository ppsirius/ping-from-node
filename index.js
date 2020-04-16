require("dotenv").config();
const axios = require("axios");

const jsonboxURL = "https://jsonbox.io/box_429718364b64a9f80eba";
const frequency = "2000";
const message = {
  device: "NAS",
  timestamp: new Date().toLocaleString(),
};

const ping = () => {
  axios
    .post(jsonboxURL, message, {
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
