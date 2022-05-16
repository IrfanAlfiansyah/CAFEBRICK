const express = require("express");
const Router = express.Router();

const promotionController = require("../controllers/promotion");

const validate = require("../middlewares/validate");

const { checkToken } = require("../middlewares/auth");

const imageUpload = require("../middlewares/upload");

Router.get("/all", promotionController.getAllPromotions);

Router.get("/:id", promotionController.getPromotionById);

Router.post("/", checkToken, imageUpload.single("picture"), validate.promotionData, promotionController.postNewPromotion); 

Router.delete("/:id", promotionController.deletePromotionById);

Router.patch("/:id", promotionController.updatePromotionById);

module.exports = Router;