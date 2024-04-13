const router = require("express").Router();

const { Product } = require("../../models/Product.js"); //module import gareko

router.get("/", async (req, res) => {
  try {
    const product = await Product.find().populate("author");
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
