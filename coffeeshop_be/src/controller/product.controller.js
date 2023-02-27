const productModel = require("../model/product.model");
const { unlink } = require("node:fs");

const Pagination = {
  page: (page, limit) => {
    let result = (page - 1) * limit + 1;
    return result ? result : 0;
  },
};

const productController = {
  get: (req, res) => {
    let { search, category, sortBy, page, limit } = req.query;
    let offset = Pagination.page(page, limit);
    return productModel
      .get(search, category, sortBy, limit, offset)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    // const id = req.params.id;
    return productModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  add: (req, res) => {
    const request = {
      ...req.body,
      file: req.files,
    };
    return productModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  // update: (req, res) => {
  //   const request = {
  //     ...req.body,
  //     id: req.params.id,
  //     file: req.files,
  //   };
  //   return productModel
  //     .update(request)
  //     .then((result) => {
  //       if (typeof result.oldImages != "undefined") {
  //         for (let index = 0; index < result.oldImages.length; index++) {
  //           unlink(
  //             `src/public/uploads/images/${result.oldImages[index].filename}`
  //           );
  //         }
  //       }
  //       return res.status(201).send({ message: "succes", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },
  update: (req, res) => {
    const { id } = req.params;
    const { title, img, price, category } = req.body;
    const files = req.files;

    const requestData = {
      id,
      title,
      img,
      price,
      category,
      file: files,
    };

    productModel
      .update(requestData)
      .then((result) => {
        if (result.oldImages && result.oldImages.length > 0) {
          for (let i = 0; i < result.oldImages.length; i++) {
            const imagePath = `src/public/uploads/images/${result.oldImages[i].filename}`;
            unlink(imagePath, (error) => {
              if (error)
                console.log(`Error deleting image ${imagePath}: ${error}`);
              else console.log(`Image ${imagePath} deleted successfully`);
            });
          }
        }
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        console.log(`Error updating product: ${error}`);
        return res.status(500).send({ message: error.message });
      });
  },

  remove: (req, res) => {
    return productModel
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = productController;
