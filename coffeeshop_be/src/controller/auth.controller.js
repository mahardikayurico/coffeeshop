const authModel = require("../model/auth.model");

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        return res.status(201).send({
          message: "succes",
          data: {
            user: result,
            token: "ABABASAJE",
          },
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  register: (req, res) => {
    return authModel
      .register(req.body)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = authController;
