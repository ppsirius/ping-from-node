import { pingStatus } from "./index";

export default (req, res) => {
  if (req.method === "GET") {
    res.send(JSON.stringify(pingStatus.get()));
  } else {
    new Error("Unhandled method");
  }
};
