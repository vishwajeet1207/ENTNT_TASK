const { productSchema } = require("../models/Fashion");
const mongoose = require("mongoose");
async function getFromCard(req, res) {
  const temp = req.params.cardHolderName;
  console.log(temp);
  const productMode = mongoose.model(temp, productSchema);
  productMode.find().then((items) => {
    return res.send(items);
  });
}
async function deleteFromCard(req, res) {
  const temp = req.params.cardHolderName;
  const titles = req.params.title;
  console.log("deleted");
  const productMode = mongoose.model(temp, productSchema);
  productMode.deleteMany({ title: titles }).then(() => {
    return res.send("deleted");
  });
}
async function addToCard(req, res) {
  const temp = req.params.cardHolderName;
  console.log(req.body.remove);
  const productMode = mongoose.model(temp, productSchema);
  productMode.findOne({ title: req.body.item.title }).then((items) => {
    if (items !== null) {
      if (req.body.remove == -1) {
        if (items.count > 1) {
          productMode
            .updateOne(
              { title: req.body.item.title },
              { count: items.count - 1 }
            )
            .then(() => {
              console.log("reduce");
              res.send("added--update");
            });
        }
      } else {
        productMode
          .updateOne({ title: req.body.item.title }, { count: items.count + 1 })
          .then(() => {
            console.log("increase");
            res.send("added--update");
          });
      }
    } else {
      const insertintocard = new productMode({
        title: req.body.item.title,
        price: req.body.item.price,
        description: req.body.item.description,
        category: req.body.item.category,
        image: req.body.item.image,
        count: 1,
        rating: {
          rate: req.body.item.rating.rate,
          count: req.body.item.rating.count,
        },
      });
      productMode.insertMany([insertintocard]).then(() => {
        console.log("ensert");
        return res.send("inserted");
      });
    }
  });
}
module.exports = {
  getFromCard,
  deleteFromCard,
  addToCard,
};
