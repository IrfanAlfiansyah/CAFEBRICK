const Router = require("express").Router();

const authController = require("../controllers/auth");
const { checkDuplicate } = require("../middlewares/auth");
//const validate = require("../middlewares/validate");

//register
Router.post("/new", checkDuplicate, authController.register);

//logIn
Router.post("/", authController.logIn);

//logOut
Router.delete("/", (_, res) => {
  res.json({
    msg: "Berhasil Logout",
  });
});

module.exports = Router;


