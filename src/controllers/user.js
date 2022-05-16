const {
  getUser,
  getSingleUserFromServer,
  createNewUser,
  deleteUser,
  updateUser,
} = require("../models/user");
const { successResponse, errorResponse } = require("../helpers/response");

const getAllusers = (req, res) => {
  getUser(req.query)
    .then((result) => {
      const { totalData, totalPage, data } = result;
      const meta = {
        totalData,
        totalPage,
        route: `/user${req.route.path}?)`,
        query: req.query,
        page: Number(req.query.page),
      };
      successResponse(res, 200, data, meta);
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
  const { file } = req;
  let picture;
  if(file){
    picture = file.path.replace("public", "").replace(/\\/g, "/");
  }
  const id = req.params.id;
  updateUser(id, req.body, picture)
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
