import db from "../../../utils/lowdb";
const chalk = require("chalk");
const ping = require("ping");

export let pingLoopRunning = false;
let loopInterval = null;

const startLoopInterval = (hostToPing, frequency) => {
  loopInterval = setInterval(() => pingLoop(hostToPing), frequency);
  pingLoopRunning = true;
};

const stopLoopInterval = () => {
  clearInterval(loopInterval);
  pingLoopRunning = false;
};

const pingLoop = (host) => {
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
};

const addEntityLog = (date, ping, host) => {
  db.get("logs").push({ timestamp: date, ping: ping, host: host }).write();
};

export default (req, res) => {
  if (req.method === "GET") {
    const {
      query: { host, frequency },
    } = req;

    if (!pingLoopRunning) {
      startLoopInterval(host, frequency);
    } else {
      stopLoopInterval();
    }
  } else {
    new Error("Unhandled method");
  }
};
