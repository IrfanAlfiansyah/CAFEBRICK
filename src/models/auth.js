const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

const register = (
  display_name,
  email,
  phone_number,
  address,
  hashedPassword
) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "INSERT INTO public.users VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const id = uuidV4();
    const timestamp = new Date(Date.now());
    const values = [
      id,
      display_name,
      email,
      phone_number,
      address,
      hashedPassword,
      timestamp,
    ];
    db.query(sqlQuery, values)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT email FROM public.users WHERE email = $1";
    db.query(sqlQuery, [email])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getPassByUserEmail = async (email) => {
  try {
    const sqlQuery = "SELECT id, pass FROM public.users WHERE email = $1";
    const result = await db.query(sqlQuery, [email]);
    if (result.rowCount === 0)
      throw { status: 400, err: { msg: "Email Is Not Registered" } };
    return result.rows[0];
  } catch (error) {
    const { status = 500, err } = error;
    throw { status, err };
  }
};

module.exports = { register, getUserByEmail, getPassByUserEmail };
