const express = require("express");
const Router = express.Router();

const pingRouter = require("./ping");
const helloRouter = require("./hello");
const productRouter = require("./product");
const promotionRouter = require("./promotion");
const transactionRouter = require("./transaction");
const userRouter = require("./user");
const authRouter = require("./auth");

Router.use("/ping", pingRouter);
Router.use("/hello", helloRouter);
Router.use("/product", productRouter);
Router.use("/promotion", promotionRouter); 
Router.use("/transaction", transactionRouter);
Router.use("/user", userRouter);
Router.use("/auth", authRouter);

module.exports = Router;

