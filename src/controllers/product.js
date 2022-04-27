const productModel = require("../models/product");
const { getProductsFromServer, getSingleProductFromServer, findProduct, findPromotion, createNewProduct } = productModel;
const { successResponse, errorResponse } = require("../helpers/response");

const getAllProducts = (req, res) => {
  getProductsFromServer()
    .then((result) => {
      const { total, data } = result;
      successResponse(res, 200, data, total);
    })
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
};

const getProductById = (req, res) => {
  const id = req.params.id;
  getSingleProductFromServer(id)
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

const findProductByQuery = (req, res) => {
  findProduct(req.query)
    .then(({ data, total }) => {
      successResponse(res, 200, data, total);
    })
    .catch(({ status, err }) => {
      errorResponse(res, status, err);
    });
};

const findPromotionByQuery = (req, res) => {
  findPromotion(req.query)
    .then(({ data, total }) => {
      successResponse(res, 200, data, total);
    })
    .catch(({ status, err }) => {
      errorResponse(res, status, err);
    });
};


const postNewProduct = (req, res) => {
  createNewProduct(req.body)
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

module.exports = {
  getAllProducts,
  getProductById,
  findProductByQuery,
  findPromotionByQuery,
  postNewProduct,
};
