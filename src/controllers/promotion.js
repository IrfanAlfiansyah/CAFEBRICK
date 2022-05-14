const promotionModel = require("../models/promotion");
const {
  getPromotion,
  getSinglePromotionFromServer,
  createNewPromotion,
  deletePromotion,
  updatePromotion,
} = promotionModel;
const { successResponse, errorResponse } = require("../helpers/response");
//

const getAllPromotions = (req, res) => {
  getPromotion(req.query)
    .then((result) => {
      const { totalData, totalPage, data } = result;
      const meta = {
        totalData,
        totalPage,
        route: `/promotion${req.route.path}?)`,
        query: req.query,
        page: Number(req.query.page),
      };
      successResponse(res, 200, data, meta);
    })
    .catch((error) => {
      console.log(error);
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
