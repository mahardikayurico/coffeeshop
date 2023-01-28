const userModel = require("../model/user.model");
const Pagination = {
  page: (page, limit) => {
    let result = (page - 1) * limit + 1;
    return result ? result : 0;
  },
};

const userController = {
  get: (req, res) => {
    let { search, fullname, sortBy, page, limit } = req.query;
    let offset = Pagination.page(page, limit);
    return userModel
      .get(search, fullname, sortBy, limit, offset)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    // const id = req.params.id;
    return userModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return userModel
      .update(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  remove: (req, res) => {
    return userModel
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = userController;
