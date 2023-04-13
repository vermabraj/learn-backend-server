const { Router } = require("express");
const { ProductModel } = require("../Model/Product.Model");
const productRoute = Router();

productRoute.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    let data = await ProductModel.find({ _id: ID });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

productRoute.get("/", async (req, res) => {
  const title = req.query.title;  
  if (title) {
    try {
      let productData = await ProductModel.find({
        $and: [{ title: { $regex: `${title}`, $options: "i" } }],
      });
      res.send(productData);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  } else if (title) {
    try {
      const productData = await ProductModel.find({
        title: { $regex: `${title}`, $options: "i" },
      });
      res.send(productData);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  } else {
    const product = await ProductModel.find();
    res.send(product);
  }
});

productRoute.post("/create", async (req, res) => {
  try {
    await ProductModel.insertMany(req.body);
    res.status(201).send({ msg: "Product has been added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

productRoute.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ msg: `Product with id:${ID} has been updated` });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: `Product with id:${ID} has been deleted` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = { productRoute };
