const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "coffe_shop",
  password: "Gatotkaca92",
  port: 5432,
});

db.connect((err) => {
  if (!err) {
    console.log("database aman");
  } else {
    console.log("db conection eror");
  }
});
module.exports = db;
