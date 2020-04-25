import db from "../../utils/lowdb";
const chalk = require("chalk");
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
        addEntityLog(new Date().toLocaleString(), res.avg, res.host);
        console.log(
          chalk.inverse(`  ${new Date().toLocaleString()}  `),
          chalk.magenta(res.avg),
          chalk.gray(res.host)
        );
      });
  });
};

const addEntityLog = (date, ping, host) => {
  db.get("logs").push({ timestamp: date, ping: ping, host: host }).write();
};

export default (req, res) => {
  if (req.method === "GET") {
    setInterval(hostsLoop, frequency);
  } else {
    new Error("Unhandled method");
  }
};
