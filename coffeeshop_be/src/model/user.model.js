const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const userModel = {
  query: (search, name, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !name) {
      return orderQuery;
    } else if (search && name) {
      return `WHERE name LIKE '%${search}%' AND name LIKE '${name}%' ${orderQuery}`;
    } else if (search || name) {
      return `WHERE name LIKE '%${search}%' OR name LIKE '${name}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (search, name, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users ${this.query(
          search,
          name,
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
  add: ({ email, password, phone_number, name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, email, password, phone_number,name) VALUES ('${uuidv4()}','${email}','${password}','${phone_number}','${name}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ email, password, phone_number, name });
          }
        }
      );
    });
  },
  update: ({ id, email, password, phone_number, name }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
          db.query(
            `UPDATE users SET email='${
              email || result.rows[0].email
            }', password='${
              password || result.rows[0].password
            }',phone_number='${
              phone_number || result.rows[0].phone_number
            }',name='${name || result.rows[0].name}'WHERE id='${id}'`,
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
