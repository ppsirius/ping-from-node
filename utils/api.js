import fetch from "isomorphic-fetch";

export const getLog = async () => {
  const res = await fetch("/api/logs");
  return await res.json();
};

export const getLastLog = async () => {
  const res = await fetch("/api/logs?filter=last");
  return await res.json();
};

export const clearDatabase = () => {
  fetch("/api/logs", {
    method: "DELETE",
  });
};

export const startPingTest = () => {
  fetch("/api/ping");
};
