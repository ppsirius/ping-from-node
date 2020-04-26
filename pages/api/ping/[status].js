import { pingLoopRunning } from "./index";

export default (req, res) => {
  console.log("status");
  if (req.method === "GET") {
    console.log(pingLoopRunning);
    res.send(JSON.stringify(pingLoopRunning));
  } else {
    new Error("Unhandled method");
  }
};
