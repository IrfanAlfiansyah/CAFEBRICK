const db = require("../config/db");


const getPromotionFromServer = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM public.promotions")
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

const getSinglePromotionFromServer = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select * from public.promotions where id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return reject({ status: 404, err: "Promotion Not Found" });
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

const createNewPromotion = (body) => {
  return new Promise((resolve, reject) => {
    const { promotion_code, detail_promo, discount } = body;
    const sqlQuery =
      "INSERT INTO public.promotions(promotion_code, detail_promo, discount) VALUES ($1, $2, $3) RETURNING *";
    db.query(sqlQuery, [promotion_code, detail_promo, discount])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

const deletePromotion = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM public.promotions where public.promotions.id = $1";
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

const updatePromotion = (id, body) => {
  return new Promise((resolve, reject) => {
    const { promotion_code, detail_promo, discount } = body;
    const sqlQuery =
      "UPDATE public.promotions SET promotion_code = $1, detail_promo = $2, discount = $3 WHERE public.promotions.id = $4";
    db.query(sqlQuery, [promotion_code, detail_promo, discount, id])
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
  getPromotionFromServer,
  getSinglePromotionFromServer,
  createNewPromotion,
  deletePromotion,
  updatePromotion,
};