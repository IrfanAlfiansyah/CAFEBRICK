const { getUserFromServer, getSingleUserFromServer, createNewUser, deleteUser, updateUser } = require("../models/user");
const { successResponse, errorResponse } = require("../helpers/response");


const getAllusers = (req, res) => {
  getUserFromServer()
    .then((result) => {
      const { total, data } = result;
      successResponse(res, 200, data, total);
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  getSingleUserFromServer(id)
    .then(({ data }) => {
      res.status(200).json({
        data,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

const postNewUser = (req, res) => {
  createNewUser(req.body)
    .then(({ data }) => {
      res.status(200).json({
        err: null,
        data,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({
        err,
        data: [],
      });
    });
};

const deleteUserById = (req, res) => {
  const id = req.params.id;
  deleteUser(id)
    .then(({ data }) => {
      res.status(200).json({
        data: data.rowCount,
        msg: "Delete Success",
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

const updateUserById = (req, res) => {
  const id = req.params.id;
  updateUser(id, req.body)
    .then(({ data }) => {
      res.status(200).json({
        data: data.rowCount,
        msg: "Update Success",
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

module.exports = {
  getAllusers,
  getUserById,
  postNewUser,
  deleteUserById,
  updateUserById,
};
