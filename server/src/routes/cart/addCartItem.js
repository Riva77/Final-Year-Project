const CartItem = require("../../models/CartItem");
const router = require("express").Router(); //express bata router import gareko

router.post("/", async (req, res) => {
  //post method banako. backemd ma database ma data pathauna frontend bata aako data
  let {user, product, quantity, totalPrice} = req.body ; //body ma chai frontend bata aako data store gareko

  try {
    const existingCartItem = await CartItem.findOne({ user, product });

    if (existingCartItem) {
      // If it exists, send a response indicating it's already in the cart
      return res
        .status(400)
        .send({ message: "Product is already in the cart." });
    }
    await new CartItem({user, product, quantity, totalPrice}).save(); //backend ma data entry gareko
    res.status(201).send({ message: "Product added to cart successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
