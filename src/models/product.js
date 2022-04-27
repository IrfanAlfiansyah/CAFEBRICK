//const res = require("express/lib/response");
const db = require("../config/db");


const getProductsFromServer = () => {
  return new Promise((resolve, reject) => {
    // let err = false;
    // if (err) return reject({
    //   err: new Error(err),
    //   status: 500,
    // });
    // return resolve(products);
    db.query("SELECT * FROM public.products")
      .then(result => {
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const getSingleProductFromServer = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select * from public.products where id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return reject({ status: 404, err: "Product Not Found" });
        }
        const response = {
          data: data.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const findProduct = (query) => {
  return new Promise((resolve, reject) => {
    const {category, order, sort} = query;
    let sqlQuery = 
    "select * from public.products where lower(category) like lower('%' || $1 || '%')";
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    db.query(sqlQuery, [category])
      .then((result) => {
        if (result.rows.length === 0) {
          return reject({ status: 404, err: "Product Not Found" });
        }
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const findPromotion = (query) => {
  return new Promise((resolve, reject) => {
    const {promotionCode, order, sort} = query;
    let sqlQuery =
    "select * from public.promotions where lower(promotionCode) like lower('%' || $1 || '%')";
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    db.query(sqlQuery, [promotionCode])
      .then((result) => {
        if (result.rows.length === 0) {
          return reject({ status: 404, err: "Promotion Not Found" });
        }
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const createNewProduct = (body) => {
  return new Promise((resolve, reject) => {
    const { menu, category, size, price } = body;
    const sqlQuery =
      "INSERT INTO public.products(menu, category, size, price) VALUES ($1, $2, $3, $4) RETURNING *";
    db.query(sqlQuery, [menu, category, size, price])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

module.exports = {
  getProductsFromServer,
  getSingleProductFromServer,
  findProduct,
  findPromotion,
  createNewProduct,
};