const ping = require("ping");
const hosts = ["google.com"];
const frequency = "2000";

const hostsLoop = () => {
  hosts.forEach(function (host) {
    // WARNING: -i 2 argument may not work in other platform like window
    ping.promise
      .probe(host, {
        timeout: 2,
        extra: ["-i", "2"],
      })
      .then(function (res) {
        console.log(res.avg, res.host, new Date().toLocaleString());
      });
  });
};

setInterval(hostsLoop, frequency);
