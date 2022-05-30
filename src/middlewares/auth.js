const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/response");
const { getUserByEmail } = require("../models/auth");

const checkDuplicate = (req, res, next) => {
  getUserByEmail(req.body.email)
    .then((result) => {
      if (result.rowCount > 0)
        return errorResponse(res, 400, { msg: "Email is Already Used" });
      next();
    })
    .catch((error) => {
      const { status, err } = error;
      errorResponse(res, status, err);
    });
};

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  //bearer token
  if (!bearerToken) {
    return errorResponse(res, 401, { msg: "Login Needed" });
  }
  const token = bearerToken.split(" ")[1];
  //verifikasi token
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    { issuer: process.env.JWT_ISSUER },
    (err, payload) => {
      if (err && err.name === "TokenExpiredError")
        return errorResponse(res, 401, { msg: "You Need To Login Again" });
      req.userPayload = payload;
      next();
    }
  );
};

module.exports = { checkDuplicate, checkToken };
