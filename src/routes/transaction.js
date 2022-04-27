const express = require("express");
const Router = express.Router();

const transactionController = require("../controllers/transaction");

const validate = require("../middlewares/validate");

Router.get("/all", transactionController.getAllTransaction);

Router.get("/:id", transactionController.getTransactionById);

Router.post("/", validate.transactionData, transactionController.postNewTransaction); 

Router.delete("/:id", transactionController.deleteTransactionById);

Router.patch("/:id", transactionController.getTransactionById);

module.exports = Router;