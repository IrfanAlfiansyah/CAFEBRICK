const db = require("../config/db");


const getTransactionFromServer = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM public.transactions")
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

const getSingleTransactionFromServer = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select * from public.transactions where id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return reject({ status: 404, err: "Transaction Not Found" });
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

const createNewTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const { nameProduct, quantity, size, subTotal, shipping, tax, total, address } = body;
    const sqlQuery =
      "INSERT INTO public.users(nameProduct, quantity, size, subTotal, shipping, tax, total, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    db.query(sqlQuery, [nameProduct, quantity, size, subTotal, shipping, tax, total, address])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM public.transactions where public.transactions.id = $1";
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

const updateTransaction = (id, body) => {
  return new Promise((resolve, reject) => {
    const { nameProduct, quantity, size, subTotal, shipping, tax, total, address, } = body;
    const sqlQuery =
      "UPDATE public.transactions SET nameProduct = $1, quantity = $2, size = $3, subTotal = $4, shipping = $5, tax = $6, total = $7, address = $8 WHERE public.transactions.id = $9";
    db.query(sqlQuery, [nameProduct, quantity, size, subTotal, shipping, tax, total, address, id])
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
  getTransactionFromServer,
  getSingleTransactionFromServer,
  createNewTransaction,
  deleteTransaction,
  updateTransaction,
};