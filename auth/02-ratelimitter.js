const request = require("supertest");
const assert = require("assert");
const express = require("express");
const app = express();

let numberOfRequestsForUser = {};

setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

app.use((req, res, next) => {
  const ip = req.ip;
  numberOfRequestsForUser[ip] = numberOfRequestsForUser[ip] || 0;

  if (numberOfRequestsForUser[ip] < 5) {
    numberOfRequestsForUser[ip]++;
    next();
  } else {
    res.status(404).json({ error: "Rate limit exceeded" });
  }
});

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

module.exports = app;
