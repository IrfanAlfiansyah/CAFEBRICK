const express = require("express");
const Router = express.Router();

const productController = require("../controllers/product");

Router.get("/all", productController.getAllProducts);

Router.get("/:id", productController.getProductById);

Router.get("/", productController.findProductByQuery);
//Router.post("/", (req, res) => {

//});

module.exports = Router;