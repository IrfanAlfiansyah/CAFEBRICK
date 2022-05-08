const db = require("../config/db");


const getProductsFromServer = () => {
  return new Promise((resolve, reject) => {
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
    const { category, order, sort } = query;
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
    const { promotionCode } = query;
    let sqlQuery =
      "select * from public.promotions where lower(promotionCode) like lower('%' || $1 || '%')";
    // if (order) {
    //   sqlQuery += " order by " + sort + " " + order;
    // }
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
    const { menu, category, size, price, picture } = body;
    const sqlQuery =
      "INSERT INTO public.products(menu, category, size, price, picture) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    db.query(sqlQuery, [menu, category, size, price, picture])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM public.products where public.products.id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        const response = {
          data,
        };

        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const updateProduct = (id, body) => {
  return new Promise((resolve, reject) => {
    const { menu, category, size, price, picture } = body;
    const sqlQuery =
      "UPDATE public.products SET menu = $1, category = $2, size = $3, price = $4, picture = $5, WHERE public.products.id = $5";
    db.query(sqlQuery, [menu, category, size, price, picture, id])
      .then((data) => {
        const response = {
          data,
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
  findPromotion,
  createNewProduct,
  deleteProduct,
  updateProduct,
};