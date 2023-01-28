require("dotenv").config();

const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");

//defaultnya express js itu ga menerima semua jenis form.
// use() middleware urlencoded, json

//menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
//untuk menerima images
app.use(express.static("src"));
//menerima json
app.use(json());
app.use(cors());

app.use("/api/v1/", router);

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});
app.listen(5000, () => {
  console.log("backend succesly running on port 5000");
});
