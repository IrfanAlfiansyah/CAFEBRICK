const { getTransactionFromServer, getSingleTransactionFromServer, createNewTransaction, deleteTransaction, updateTransaction } = require("../models/transaction");
const { successResponse, errorResponse } = require("../helpers/response");

const getAllTransaction = (req, res) => {
  getTransactionFromServer()
    .then((result) => {
      const { total, data } = result;
      successResponse(res, 200, data, total);
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

const getTransactionById = (req, res) => {
  const id = req.params.id;
  getSingleTransactionFromServer(id)
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

const postNewTransaction = (req, res) => {
  createNewTransaction(req.body)
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

const deleteTransactionById = (req, res) => {
  const id = req.params.id;
  deleteTransaction(id)
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

const updateTransactionById = (req, res) => {
  const id = req.params.id;
  updateTransaction(id, req.body)
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
  getAllTransaction,
  getTransactionById,
  postNewTransaction,
  deleteTransactionById,
  updateTransactionById,
};
