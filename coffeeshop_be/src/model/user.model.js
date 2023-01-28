const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const userModel = {
  query: (search, fullname, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY fullname ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !fullname) {
      return orderQuery;
    } else if (search && fullname) {
      return `WHERE fullname LIKE '%${search}%' AND fullname LIKE '${fullname}%' ${orderQuery}`;
    } else if (search || fullname) {
      return `WHERE fullname LIKE '%${search}%' OR fullname LIKE '${fullname}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (search, fullname, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users ${this.query(
          search,
          fullname,
          sortBy,
          limit,
          offset
        )}`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    // const { id } = req.params;
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
  update: ({
    id,
    fullname,
    username,
    password,
    email,
    address,
    phone_number,
    image,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
          db.query(
            `UPDATE users SET fullname='${
              fullname || result.rows[0].fullname
            }', username ='${username || result.rows[0].username}', password='${
              password || result.rows[0].password
            }',email ='${email || result.rows[0].email}',address='${
              address || result.rows[0].address
            }',phone_number='${
              phone_number || result.rows[0].phone_number
            },image='${image || result.rows[0].image}'WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({ id, email, password, phone_number, name });
              }
            }
          );
        }
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = userModel;
