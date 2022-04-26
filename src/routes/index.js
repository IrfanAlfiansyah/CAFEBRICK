const express = require("express");
const Router = express.Router();

const pingRouter = require("./ping");
const helloRouter = require("./hello");
const productRouter = require("./product");

Router.use("/ping", pingRouter);
Router.use("/hello", helloRouter);
Router.use("/product", productRouter);

module.exports = Router;

