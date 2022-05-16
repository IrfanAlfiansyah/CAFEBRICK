const productModel = require("../models/product");
const {
  getProducts,
  getSingleProductFromServer,
  findProduct,
  searchProduct,
  findPromotion,
  createNewProduct,
  deleteProduct,
  updateProduct,
} = productModel;
const { successResponse, errorResponse } = require("../helpers/response");

const getAllProducts = (req, res) => {
  getProducts(req.query)
    .then((result) => {
      const { totalData, totalPage, data } = result;
      const meta = {
        totalData,
        totalPage,
        route: `/product${req.route.path}?)`,
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

const searchProductByQuery = (req, res) => {
  searchProduct(req.query)
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
  const { file } = req;
  let picture;
  if(file){
    picture = file.path.replace("public", "").replace(/\\/g, "/");
  }
  createNewProduct(req.body, picture)
    .then(({ data }) => {
      res.status(200).json({
        message: "Product Created",
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

const deleteProductById = (req, res) => {
  const id = req.params.id;
  deleteProduct(id)
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

const updateProductById = (req, res) => {
  const id = req.params.id;
  updateProduct(id, req.body)
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
  getAllProducts,
  getProductById,
  findProductByQuery,
  searchProductByQuery,
  findPromotionByQuery,
  postNewProduct,
  deleteProductById,
  updateProductById,
};
