const router = require("express").Router();

const { Product } = require("../../models/Product");

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("author"); //Id liyera product ko data fetch gareko

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;