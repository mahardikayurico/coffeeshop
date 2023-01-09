const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const authModel = {
  login: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * INTO users WHERE username=$1 password=$2`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            if (result.row.length == 0) {
              return reject("USER_NOTFOUNF");
            } else {
              return resolve(result.row[0]);
            }
          }
        }
      );
    });
  },
  register: ({ username, password }) => {
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
};

module.exports = authModel;
