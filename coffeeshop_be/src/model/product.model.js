const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const productModel = {
  query: (search, category, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY title ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (search && category) {
      return `WHERE title LIKE '%${search}%' AND category LIKE '${category}%' ${orderQuery}`;
    } else if (search || category) {
      return `WHERE title LIKE '%${search}%' OR category LIKE '${category}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },
  whereSearchAndCategory: (search, category) => {
    if (search && category) {
      return `WHERE products.title ILIKE '%${search}%' AND category ILIKE '${category}%'`;
    } else if (search || category) {
      return `WHERE products.title ILIKE '%${search}%' OR category ILIKE '${category}%'`;
    } else {
      return "";
    }
  },

  orderAndGroup: (sortBy, limit, offset) => {
    return `GROUP BY products.id ORDER BY title ${sortBy} LIMIT ${limit} OFFSET ${offset}`;
  },

  get: function (search, category, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT products.id, products.title, products.price, products.category,
        json_agg(row_to_json(products_images)) images 
        FROM products INNER JOIN products_images ON products.id=products_images.id_products
        ${this.whereSearchAndCategory(search, category)}
        ${this.orderAndGroup(sortBy, limit, offset)}`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    // const { id } = req.params;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT products.id, products.title, products.price, products.category,
      json_agg(row_to_json(products_images)) images 
      FROM products INNER JOIN products_images ON products.id=products_images.id_products AND 
      id='${id}'
      GROUP BY products.id `,
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

  add: ({ title, price, category, file }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, title, price, category) VALUES ('${uuidv4()}','${title}','${price}','${category}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            for (let index = 0; index < file.length; index++) {
              db.query(
                `INSERT INTO products_images (id_images, id_products, title, filename) VALUES($1, $2 ,$3 , $4)`,
                [uuidv4(), result.rows[0].id, title, file[index].filename]
              );
            }
            return resolve({ title, price, category, Image: file });
          }
        }
      );
    });
  },
  update: ({ id, title, img, price, category, file }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE products SET title='${
              title || result.rows[0].title
            }', img='${img || result.rows[0].img}',price='${
              price || result.rows[0].price
            }', category='${
              category || result.rows[0].category
            }' WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                if (file.length <= 0)
                  return resolve({ id, title, price, category });
                db.query(
                  `SELECT id_images, filename FROM products_images WHERE id_products='${id}'`,
                  (errProductsImages, productsImages) => {
                    if (errProductsImages)
                      return reject({ message: errProductsImages.message });
                    for (let indexNew = 0; indexNew < file.length; indexNew++) {
                      db.query(
                        `UPDATE products_images SET filename=$1 WHERE id_images=$2`,
                        [
                          file[indexNew].filename,
                          productsImages.rows[indexNew].id_images,
                        ],
                        (err, result) => {
                          if (err) {
                            return reject({ message: "images is not deleted" });
                          } else {
                            return resolve({
                              id,
                              title,
                              price,
                              category,
                              oldImages: productsImages.rows,
                              images: file,
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `DELETE FROM products_images WHERE id_products='${id}' RETURNING filename`,
            (err, result) => {
              if (err) return reject({ message: "images is not deleted" });
              return resolve(result.rows);
            }
          );
        }
      });
    });
  },
};

module.exports = productModel;
