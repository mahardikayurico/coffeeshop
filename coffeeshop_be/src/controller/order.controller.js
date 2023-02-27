const orderModel = require("../model/order.model");
const orderController = {
  // add: async (req, res) => {
  //   try {
  //     const order = await Order.add(req.body);
  //     res.status(201).send({ message: "success", data: order });
  //   } catch (err) {
  //     res.status(500).send({ message: err });
  //   }
  // },
  add: (req, res) => {
    const request = {
      ...req.body,
    };
    return orderModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getByUserId: (req, res) => {
    // const id = req.params.id;
    // console.log(req.params.userId);
    return orderModel
      .getByUserId(req.params.user_id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  // getByUserId: async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const result = await orderModel.getByUserId(userId);
  //     return res.status(200).send({ message: "success", data: result });
  //   } catch (error) {
  //     return res.status(500).send({ message: error });
  //   }
  // },
};

module.exports = orderController;
