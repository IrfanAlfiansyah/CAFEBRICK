const express = require("express");
const Router = express.Router();

const productController = require("../controllers/product");

const validate = require("../middlewares/validate");

const { checkToken } = require("../middlewares/auth");

Router.get("/all", productController.getAllProducts);

Router.get("/:id", productController.getProductById);

Router.get("/", validate.queryFind, productController.findProductByQuery);

Router.get("/", productController.searchProductByQuery);

Router.get("/", productController.findPromotionByQuery);

Router.post("/", checkToken, validate.productData, productController.postNewProduct); 

Router.delete("/:id", productController.deleteProductById);

Router.patch("/:id", productController.updateProductById);

module.exports = Router;