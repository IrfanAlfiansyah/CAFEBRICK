//const db = require("../config/db");
const productModel = require("../models/product");
const {getProductsFromServer, getSingleProductFromServer, findProduct} = productModel;


const getAllProducts = (req, res) => {
  getProductsFromServer()
    .then((result) => {
        const {total, data} = result;
      res.status(200).json({
        data,
        total,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status} = error;
      res.status(500).json({
        err,
        data: [],
      });
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
    const {err, status} = error;
    res.status(status).json({
      data: [],
      err,
    });
  });
};

const findProductByQuery = (req, res) => {
  findProduct(req.query)
  .then(({data, total}) => {
    res.status(200).json({
      err: null,
      data,
      total,
    });
  })
  .catch(({status, err}) => {
    res.status(status).json({
      data: [],
      err,
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  findProductByQuery,
};
