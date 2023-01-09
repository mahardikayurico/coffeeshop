const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ username, password }) => {
    // console.log(username, password);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE username=$1`,
        [username],
        (err, result) => {
          //username = unique||email = unique
          if (err) return reject(err.message);
          if (result.rows.length == 0)
            return reject("username/password salah."); //ketika username salah
          bcrypt.compare(
            password,
            result.rows[0].password,
            (err, hashingResult) => {
              if (err) return reject(err.message); //kesalahan hashing(bycript)
              if (!hashingResult) return reject("username/password salah."); //ketika password salah
              return resolve(result.rows[0]);
            }
          );
        }
      );
    });
  },
  register: ({
    fullname,
    username,
    password,
    email,
    address,
    phone_number,
    image,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, fullname, username, password, email, address, phone_number, image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          uuidv4(),
          fullname,
          username,
          password,
          email,
          address,
          phone_number,
          image,
        ],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve("ADD_SUCCESS");
          }
        }
      );
    });
  },
};

module.exports = authModel;
