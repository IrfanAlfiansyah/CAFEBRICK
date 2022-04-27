const express = require("express");
const Router = express.Router();

const promotionController = require("../controllers/promotion");

const validate = require("../middlewares/validate");

Router.get("/all", promotionController.getAllpromotions);

Router.get("/:id", promotionController.getPromotionById);

Router.post("/", validate.promotionData, promotionController.postNewPromotion); 

Router.delete("/:id", promotionController.deletePromotionById);

Router.patch("/:id", promotionController.getPromotionById);

module.exports = Router;