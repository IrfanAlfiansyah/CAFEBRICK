const bcrypt = require("bcrypt");
const auth = {};
const jwt = require("jsonwebtoken");

const { successResponse, errorResponse } = require("../helpers/response");
const { register, getPassByUserEmail } = require("../models/auth");


auth.register = (req, res) => {
  const { body: { display_name, email, phone_number, address, pass }, } = req;
  bcrypt
    .hash(pass, 10)
    .then((hashedPassword) => {
      register(display_name, email, phone_number, address, hashedPassword)
        .then(() => {
          successResponse(res, 201, { msg: "Register Success" }, null);
        })
        .catch((error) => {
          const { status, err } = error;
          errorResponse(res, status, err);
        });
    })
    .catch((err) => {
      errorResponse(res, 500, err);
    });
};

auth.logIn = async (req, res) => {
  try {
    const {
      body: { email, pass },
    } = req;

    const data = await getPassByUserEmail(email);
    const result = await bcrypt.compare(pass, data.pass);
    if (!result)
      return errorResponse(res, 400, { msg: "Email Or Password Is Wrong" });

    const payload = {
      id: data.id,
      email,
    };
    const jwtOpions = {
      issuer: process.env.JWT_ISSUER, 
      expiresIn: "1000s",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOpions);
    successResponse(res, 200, { email, token }, null);
  } catch (error) { 
    const { status, err } = error;
    errorResponse(res, status, err);
  }
};

module.exports = auth;