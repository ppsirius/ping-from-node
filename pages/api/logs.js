import db from "../../utils/lowdb";

const getLogs = () => {
  return db.get("log").sortBy("timestamp");
};

const getLastLog = () => {
  const logsLength = db.get("log").size().value();
  return db.get(`log[${logsLength - 1}]`).value();
};

export default (req, res) => {
  if (req.method === "GET") {
    const {
      query: { filter },
    } = req;

    if (filter === "last") {
      res.end(JSON.stringify(getLastLog()));
    } else {
      res.end(JSON.stringify(getLogs()));
    }
  } else {
    new Error("Unhandled method");
  }
};
