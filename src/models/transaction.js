const db = require("../config/db");

const getTransaction = (query) => {
  return new Promise((resolve, reject) => {
    const { page = 1, limit = 4 } = query;
    const offset = (Number(page - 1)) * Number(limit);

    db.query("SELECT * FROM public.transactions ORDER BY id LIMIT $1 OFFSET $2", [Number(limit), offset])
      .then((result) => {
        const response = {
          data: result.rows,
        };
        db.query("SELECT COUNT(*) AS total_transaction FROM public.transactions")
          .then((result) => {
            response.totalData = Number(result.rows[0]["total_transaction"]);
            response.totalPage = Math.ceil(response.totalData / Number(limit)
            );
            resolve(response);
          })
          .catch((err) => {
            reject({ status: 500, err });
          }); 
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
    const {
      product_id,
      quantity,
      size,
      sub_total,
      shipping,
      tax,
      total,
      address,
    } = body;
    const sqlQuery =
      "INSERT INTO public.transactions(product_id, quantity, size, sub_total, shipping, tax, total, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    db.query(sqlQuery, [
      product_id,
      quantity,
      size,
      sub_total,
      shipping,
      tax,
      total,
      address,
    ])
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
    const sqlQuery =
      "DELETE FROM public.transactions where public.transactions.id = $1";
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
    const {
      product_id,
      quantity,
      size,
      sub_total,
      shipping,
      tax,
      total,
      address,
    } = body;
    const sqlQuery =
      "UPDATE public.transactions SET product_id = $1, quantity = $2, size = $3, sub_total = $4, shipping = $5, tax = $6, total = $7, address = $8 WHERE public.transactions.id = $9";
    db.query(sqlQuery, [
      product_id,
      quantity,
      size,
      sub_total,
      shipping,
      tax,
      total,
      address,
      id,
    ])
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
  getTransaction,
  getSingleTransactionFromServer,
  createNewTransaction,
  deleteTransaction,
  updateTransaction,
};
