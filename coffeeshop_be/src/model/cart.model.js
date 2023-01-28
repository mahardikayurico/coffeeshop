const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const cartModel = {
  query: (search, size, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY fullname ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !size) {
      return orderQuery;
    } else if (search && size) {
      return `WHERE title LIKE '%${search}%' AND size LIKE '${size}%' ${orderQuery}`;
    } else if (search || size) {
      return `WHERE title LIKE '%${search}%' OR size LIKE '${size}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (search, size, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from cart ${this.query(search, size, sortBy, limit, offset)}`,
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
      db.query(`SELECT * from cart WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
  add: ({ title, price, size, address }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO cart (id, title, price, size, address) VALUES ('${uuidv4()}','${title}','${price}','${size}','${address}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ title, price, size, address });
          }
        }
      );
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from cart WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = cartModel;
