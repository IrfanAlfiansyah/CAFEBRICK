const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.json({
    msg: "world",
  });
});

Router.post("/", (req, res) => {
  res.json({
    msg: "early morning",
  });
});

Router.patch("/", (req, res) => {
  res.json({
    msg: "early morning",
  });
});

Router.delete("/", (req, res) => {
  res.json({
    msg: "morning",
  });
});

module.exports = Router;
