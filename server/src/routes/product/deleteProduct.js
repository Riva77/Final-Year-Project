const router = require("express").Router();
const { Product } = require("../../models/Product.js");

router.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).send({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
