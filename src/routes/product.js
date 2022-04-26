const express = require("express");
const Router = express.Router();

const productController = require("../controllers/product");

Router.get("/all", productController.getAllProducts);

Router.get("/1", productController.getProductById);

//Router.post("/", (req, res) => {

//});

module.exports = Router;