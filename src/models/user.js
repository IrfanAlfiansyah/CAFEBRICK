const db = require("../config/db");

const getUser = (query) => {
  return new Promise((resolve, reject) => {
    const { page = 1, limit = 3} = query;
    const offset = (Number(page - 1)) * Number(limit);

    db.query("SELECT * FROM public.users ORDER BY id LIMIT $1 OFFSET $2", [Number(limit), offset])
      .then((result) => {
        const response = {
          data: result.rows,
        };
        db.query("SELECT COUNT(*) AS total_user FROM public.users")
          .then((result) => {
            response.totalData = Number(result.rows[0]["total_user"]);
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

const getSingleUserFromServer = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select * from public.users where id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return reject({ status: 404, err: "User Not Found" });
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

const createNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const { display_name, email, phone_number, address } = body;
    const sqlQuery =
      "INSERT INTO public.users(display_name, email, phone_number, address) VALUES ($1, $2, $3, $4) RETURNING *";
    db.query(sqlQuery, [display_name, email, phone_number, address])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM public.users where public.users.id = $1";
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

const updateUser = (id, body) => {
  return new Promise((resolve, reject) => {
    const { display_name, email, phone_number, address } = body;
    const sqlQuery =
      "UPDATE public.users SET display_name = $1, email = $2, phone_number = $3, address = $4 WHERE public.users.id = $5";
    db.query(sqlQuery, [display_name, email, phone_number, address, id])
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
  getUser,
  getSingleUserFromServer,
  createNewUser,
  deleteUser,
  updateUser,
};
