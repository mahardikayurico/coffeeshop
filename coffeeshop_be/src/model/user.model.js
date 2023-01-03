const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const userModel = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from products`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(res.status(200).send({ data: result.rows }));
        }
      });
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}','${title}','${img}','${price}','${category}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ title, img, price, category });
          }
        }
      );
    });
  },
  upadate: (req, res) => {},
  remove: (req, res) => {},
};
module.exports = userModel;
