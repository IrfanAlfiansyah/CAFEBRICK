const express = require("express");
const Router = express.Router();

const userController = require("../controllers/user");

const validate = require("../middlewares/validate");

const { checkToken } = require("../middlewares/auth");

Router.get("/all", userController.getAllusers);

Router.get("/:id", userController.getUserById);

Router.post("/", checkToken, validate.userData, userController.postNewUser); 

Router.delete("/:id", userController.deleteUserById);

Router.patch("/:id", userController.updateUserById);

Router.post("/", userController.postNewUser);

module.exports = Router;