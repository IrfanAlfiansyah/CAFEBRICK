const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.json({
    msg: "world",
  });
});

module.exports = Router;
