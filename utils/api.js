import fetch from "isomorphic-fetch";
import { composeStatic } from "styletron-react";

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
  fetch("/api/ping?host=google.com&frequency=2000", {
    host: "google.com",
    frequency: 2000,
  });
};

export const checkStatus = async () => {
  const res = await fetch("/api/ping/status");
  return await res.json();
};
