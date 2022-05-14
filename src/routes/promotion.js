const express = require("express");
const Router = express.Router();

const promotionController = require("../controllers/promotion");

const validate = require("../middlewares/validate");

const { checkToken } = require("../middlewares/auth");

Router.get("/all", promotionController.getAllPromotions);

Router.get("/:id", promotionController.getPromotionById);

Router.post("/", checkToken, validate.promotionData, promotionController.postNewPromotion); 

Router.delete("/:id", promotionController.deletePromotionById);

Router.patch("/:id", promotionController.updatePromotionById);

module.exports = Router;