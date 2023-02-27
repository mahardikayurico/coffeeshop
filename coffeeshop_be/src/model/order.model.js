const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const orderModel = {
  // add: async ({ userId, paymentMethod, totalPrice, products }) => {
  //   const order_id = uuidv4();
  //   try {
  //     // Insert data into order table
  //     await db.query(
  //       `INSERT INTO orders (id, user_id, payment_method, total_price) VALUES ('${order_id}','${userId}','${paymentMethod}','${totalPrice}')`
  //     );

  //     // Insert data into order_product table
  //     //   for (let i = 0; i < products.length; i++) {
  //     //     const { title, price, image } = products[i];
  //     //     // const theaters_id = uuidv4();
  //     //     await db.query(
  //     //       `INSERT INTO order_product (id, order_id, title, price, image) VALUES ('${uuidv4()}','${order_id}', '${title}','${price}', '${
  //     //         products[i].image
  //     //       }')`
  //     //     );
  //     //   }
  //     // Insert data into order_product table
  //     const orderProductPromises = products.map(async (product) => {
  //       const { title, price, image } = product;
  //       const orderProductId = uuidv4();
  //       const queryString = `INSERT INTO order_product (id, order_id, title, price, image) VALUES ('${orderProductId}','${order_id}', '${title}','${price}', '${image}')`;

  //       await db.query(queryString);
  //     });

  //     await Promise.all(orderProductPromises);

  //     return {
  //       userId,
  //       paymentMethod,
  //       totalPrice,
  //       products,
  //     };
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // },
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
};

module.exports = orderModel;
