const express = require("express");
const Router = express.Router();

const userController = require("../controllers/user");

const validate = require("../middlewares/validate");

const { checkToken } = require("../middlewares/auth");

const imageUpload = require("../middlewares/upload"); 

const db = require("../config/db");

const { successResponse, errorResponse } = require("../helpers/response");

Router.get("/all", userController.getAllusers);

Router.get("/:id", userController.getUserById);

Router.post("/", checkToken, imageUpload.single("picture"), userController.postNewUser); 

Router.delete("/:id", userController.deleteUserById);

Router.patch("/:id", checkToken, validate.userData, userController.updateUserById);

Router.patch("/", checkToken, imageUpload.single("picture"), (req, res) => {
  const id = req.userPayload.id;
  const { file = null } = req;
  const picture = file.path.replace("public", "").replace(/\\/g, "/");
  db.query("UPDATE public.users SET picture = $1 WHERE id = $2 RETURNING picture", [
    picture,
    id,
  ])
    .then((result) => {
      successResponse(res, 200, result.rows[0], null);
    })
    .catch((err) => {
      errorResponse(res, 500, err);
    });
});

Router.post("/", userController.postNewUser);

module.exports = Router;