const { getPromotionFromServer, getSinglePromotionFromServer, createNewPromotion, deletePromotion, updatePromotion } = require("../models/promotions");
const { successResponse, errorResponse } = require("../helpers/response");

const getAllPromotions = (req, res) => {
  getPromotionFromServer()
    .then((result) => {
      const { total, data } = result;
      successResponse(res, 200, data, total);
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

const getPromotionById = (req, res) => {
  const id = req.params.id;
  getSinglePromotionFromServer(id)
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

const postNewPromotion = (req, res) => {
  createNewPromotion(req.body)
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

const deletePromotionById = (req, res) => {
  const id = req.params.id;
  deletePromotion(id)
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

const updatePromotionById = (req, res) => {
  const id = req.params.id;
  updatePromotion(id, req.body)
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
  getAllPromotions,
  getPromotionById,
  postNewPromotion,
  deletePromotionById,
  updatePromotionById,
};
