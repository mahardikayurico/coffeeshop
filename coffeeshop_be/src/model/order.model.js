const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const orderModel = {
  add: (order) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders (id, user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          uuidv4(),
          order.userId,
          order.productId,
          order.quantity,
          order.totalPrice,
        ],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },

  getByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT orders.id, orders.user_id, orders.product_id, orders.quantity, orders.total_price,
        products.title, products.price, products.category,
        json_agg(row_to_json(products_images)) images
        FROM orders
        INNER JOIN products ON  products.id = orders.product_id
        INNER JOIN products_images ON products.id = products_images.id_products
        WHERE orders.user_id='${userId}'
        GROUP BY orders.id, products.id`,
        // [userId],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else if (result.rowCount === 0) {
            return reject({ status: 404, message: "Not found" });
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  // add: (order) => {
  //   return new Promise((resolve, reject) => {
  //     const orderData = order.products.map((product) => [
  //       uuidv4(),
  //       order.userId,
  //       product.id,
  //       product.quantity,
  //       product.price * product.quantity,
  //     ]);
  //     db.query(
  //       "INSERT INTO orders (id, user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4, $5)",
  //       orderData.flat(),
  //       (err, result) => {
  //         if (err) {
  //           return reject(err.message);
  //         } else {
  //           return resolve(result.rows);
  //         }
  //       }
  //     );
  //   });
  // },
};

module.exports = orderModel;
