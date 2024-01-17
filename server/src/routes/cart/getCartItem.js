const router = require("express").Router();

const CartItem = require("../../models/CartItem");

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.id;
    const cartItem = await CartItem.find({ user: userId }).populate("product"); //Overall user ko data fetch gareko

    if (!cartItem) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
