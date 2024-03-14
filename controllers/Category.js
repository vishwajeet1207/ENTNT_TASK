const slugify = require("slugify");
const { categoryModel } = require("../models/Category");

async function getCategory(req, res) {
  try {
    const cat = await categoryModel.find();
    res.send({
      success: true,
      message: "Successfully Fetch",
      category: cat,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to Fetch",
      category: null,
    });
  }
}
async function addCategory(req, res) {
  // await CategoryModel.insertOne
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.send({
        success: false,
        message: "Enter Category Name",
      });
    }

    const checkAvailble = await categoryModel.findOne({ name: name });
    console.log("ready to create", checkAvailble);

    if (checkAvailble) {
      return res.send({
        success: false,
        message: "Category Already Exits",
      });
    }
    const temp = await categoryModel.create({ name, slug: slugify(name) });
    res.send({
      success: true,
      message: "Category Added Successfully",
      temp,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something Happen",
    });
  }
}
async function updateCategory(req, res) {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.send({
        success: false,
        message: "Enter Category Name",
      });
    }

    const temp = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name: name, slug: slugify(name) },
      { new: true }
    );

    if (temp) {
      return res.send({
        success: true,
        message: "Updated Successfully",
        temp,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Something Happen",
    });
  }
}
async function deleteCategory(req, res) {
  try {
    const { name } = req.body;
    console.log(name);
    const temp = await categoryModel.deleteOne({ name: name });

    if (temp) {
      return res.send({
        success: true,
        message: "Deleted Successfully",
        temp,
      });
    } else {
      return res.send({
        success: false,
        message: "Try Again",
        temp,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Something Happen",
    });
  }
}
module.exports = { getCategory, addCategory, updateCategory, deleteCategory };
