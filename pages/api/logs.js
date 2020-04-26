import db from "../../utils/lowdb";

const getLogs = () => {
  return db.get("logs").sortBy("timestamp");
};

const getLastLog = () => {
  const logsLength = db.get("logs").size().value();

  console.log(db.get(`logs[${logsLength - 1}]`).value(), " last log");
  return db.get(`logs[${logsLength - 1}]`).value();
};

const deleteAllLogs = () => {
  db.get("logs").remove().write();
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
  } else if (req.method === "DELETE") {
    deleteAllLogs();
    res.end(JSON.stringify("Successful deleted"));
  } else {
    new Error("Unhandled method");
  }
};
