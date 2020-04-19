import db from "../../utils/lowdb";

const getLogs = () => {
  return db.get("log").sortBy("timestamp");
};

export default (req, res) => {
  if (req.method === "GET") {
    res.end(JSON.stringify(getLogs()));
  } else {
    new Error("Unhandled method");
  }
};
