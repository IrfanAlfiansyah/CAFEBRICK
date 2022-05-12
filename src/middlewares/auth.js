const { errorResponse } = require("../helpers/response");
const { getUserByEamil } = require("../models/auth");

const checkDuplicate = (req, res, next) => {
  getUserByEamil(req.body.email)
    .then(result => {
      if (result.rowCount > 0)
        return errorResponse(res, 400, { msg: "Email Already Used" });
      next();
    })
    .catch((error) => {
      const{ status, err} = error;
      errorResponse(res, status, err);
    });
};



module.exports = { checkDuplicate };