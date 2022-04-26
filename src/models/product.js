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
        }
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
        reject({ status: 500, err })
      });
  });
};

const findProduct = (query) => {
  return new Promise((resolve, reject) => {
    const menu = query.menu;
    const sqlQuery = "select * from public.products where lower(menu) like lower('%' || $1 || '%')";
    db.query(sqlQuery, [menu])
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

module.exports = {
  getProductsFromServer,
  getSingleProductFromServer,
  findProduct,
}