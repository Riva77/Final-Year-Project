const router = require("express").Router();

const Order = require("../../models/Order.js"); //module import gareko

router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
