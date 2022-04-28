const express = require("express");
const Router = express.Router();

const userController = require("../controllers/user");

const validate = require("../middlewares/validate");

Router.get("/all", userController.getAllusers);

Router.get("/:id", userController.getUserById);

Router.post("/", validate.userData, userController.postNewUser); 

Router.delete("/:id", userController.deleteUserById);

Router.patch("/:id", userController.updateUserById);

Router.post("/", userController.postNewUser);

module.exports = Router;