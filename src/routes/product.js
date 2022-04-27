const express = require("express");
const Router = express.Router();

const productController = require("../controllers/product");
const validate = require("../middlewares/validate");

Router.get("/all", productController.getAllProducts);

Router.get("/:id", productController.getProductById);

Router.get("/", productController.findProductByQuery);

Router.get("/", productController.findPromotionByQuery);

Router.post("/", validate.productData, productController.postNewProduct); 



module.exports = Router;