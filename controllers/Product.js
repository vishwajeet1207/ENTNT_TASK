const fs = require("fs");
const { productModel } = require("../models/Product");
const slugify = require("slugify");
const { stringify } = require("querystring");
async function createProduct(req, res) {
  try {
    const { name, description, price, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;
    if (name === undefined) {
      return res.send({ success: false, message: "Name is required" });
    }
    if (photo && photo.size > 1000000) {
      return res.send({ success: false, message: "Photo  is less than 1Mb" });
    }
    if (!description) {
      return res.send({ success: false, message: "Description is required" });
    }
    if (!price) {
      return res.send({ success: false, message: "Price is required" });
    }
    if (!category) {
      return res.send({ success: false, message: "Category is required" });
    }
    if (!quantity) {
      return res.send({ success: false, message: "Quantity is required" });
    }
    if (!photo) {
      return res.send({ success: false, message: "Photo is required" });
    }
    const productNewModel = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      productNewModel.photo.data = fs.readFileSync(photo.path);
      productNewModel.photo.contentType = photo.type;
    }
    await productNewModel.save();

    res.send({
      success: true,
      message: "Product Successfully Added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error in Product Creation",
    });
  }
}
async function getProduct(req, res) {
  const product = await productModel.find();
  res.send({ success: true, product: product });
}
async function getFilterProduct(req, res) {
  try {
    const temp = req.body;
    const arg = {};
    if (temp.category.length > 0) {
      arg.category = temp.category;
    }
    if (temp.price.length > 0) {
      arg.price = { $gte: temp.price[0], $lte: temp.price[1] };
    }
    const product = await productModel.find(arg);
    res.send({ success: true, product: product });
  } catch (error) {
    res.send({
      success: false,
    });
  }
}
async function getSearchProduct(req, res) {
  const { keyword } = req.params;
  try {
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    if (result.length === 0) {
      res.send({
        success: true,
        product: [],
      });
    } else {
      res.send({
        success: true,
        product: result,
      });
    }
  } catch (error) {
    res.send({
      success: false,
    });
  }
}
async function getPhoto(req, res) {
  try {
    const pho = await productModel.findById(req.params.pid).select("photo");
    if (pho.photo.data) {
      res.set("Content-type", pho.photo.contentType);
      return res.send(pho.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something is wrong",
    });
  }
}
async function deleteProduct(req, res) {
  try {
    const pho = await productModel.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Product Not Deleted",
    });
  }
}
async function updateProduct(req, res) {
  try {
    const { name, description, price, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;

    if (name === undefined) {
      return res.send({ success: false, message: "Name is required" });
    }
    if (photo && photo.size > 1000000) {
      return res.send({ success: false, message: "Photo  is less than 1Mb" });
    }
    if (!description) {
      return res.send({ success: false, message: "Description is required" });
    }
    if (!price) {
      return res.send({ success: false, message: "Price is required" });
    }
    if (!category) {
      return res.send({ success: false, message: "Category is required" });
    }
    if (!quantity) {
      return res.send({ success: false, message: "Quantity is required" });
    }
    if (photo) {
      await productModel.findByIdAndUpdate(req.params.id, {
        ...req.fields,
        slug: slugify(name),
        photo: { data: fs.readFileSync(photo.path), contentType: photo.type },
      });
      const restosends = await productModel.findById(req.params.id);
      return res.send({
        success: true,
        message: "Product Successfully Added",
        product: restosends,
      });
    } else {
      await productModel.findByIdAndUpdate(req.params.id, {
        ...req.fields,
        slug: slugify(name),
      });
      const restosend = await productModel.findById(req.params.id);

      return res.send({
        success: true,
        message: "Product Successfully Added",
        product: restosend,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Error in Product Creation",
    });
  }
}
module.exports = {
  createProduct,
  getPhoto,
  getProduct,
  updateProduct,
  deleteProduct,
  getFilterProduct,
  getSearchProduct,
};
