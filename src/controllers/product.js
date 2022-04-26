const productModel = require("../models/product");
const {getProductsFromServer, getSingleProductFromServer} = productModel;


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
  getSingleProductFromServer(26)
  .then((result) => {
    res.status(200).json({
      data: result,
      err: null,
    });
  })
  .catch((error) => {
    const {err, status} = error;
    res.status(status).json({
      data: [],
      err: err.message,
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById
};
