const router = require("express").Router(); //express bata router import gareko
const Order = require("../../models/Order.js");
const { khaltiPayment } = require("../../services/payment.service.js");

router.post("/", async (req, res) => {
  //post method banako. backemd ma database ma data pathauna frontend bata aako data
  let body = { ...req.body }; //body ma chai frontend bata aako data store gareko

  try {
    const order = await new Order({ ...body }).save(); //backend ma data entry gareko

    //khalti payload
    const requestPayload = {
      return_url: `http://localhost:8000/api/khalti/callback`,
      website_url: `http://localhost:8000`,
      amount: req.body.totalPrice * 100,
      purchase_order_id: order._id,
      purchase_order_name: "Order " + order.customer,
    };

    const khalti = await khaltiPayment(requestPayload); //khalti payment gareko
    console.log(khalti);

    res
      .status(201)
      .send({ data: khalti, message: "Order placed successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
