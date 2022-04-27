const db = require("../config/db");


const getUserFromServer = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM public.users")
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
    const { displayName, email, phoneNumber, address } = body;
    const sqlQuery =
      "INSERT INTO public.users(displayName, email, phoneNumber, address) VALUES ($1, $2, $3, $4) RETURNING *";
    db.query(sqlQuery, [displayName, email, phoneNumber, address])
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
    const { displayName, email, phoneNumber, address } = body;
    const sqlQuery =
      "UPDATE public.users SET displayName = $1, email = $2, phoneNumber = $3, address = $4 WHERE public.users.id = $5";
    db.query(sqlQuery, [displayName, email, phoneNumber, address, id])
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
  getUserFromServer,
  getSingleUserFromServer,
  createNewUser,
  deleteUser,
  updateUser,
};