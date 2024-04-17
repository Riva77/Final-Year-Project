const router = require("express").Router(); //express bata router import gareko
const Order = require("../../models/Order.js");
const { khaltiPayment } = require("../../services/payment.service.js");

router.post("/", async (req, res) => {
  //post method banako. backemd ma database ma data pathauna frontend bata aako data
  let body = { ...req.body }; //body ma chai frontend bata aako data store gareko
  console.log(body);

  try {
    const order = await new Order({ ...body }).save(); //backend ma data entry gareko

    if (body.paymentType === "Khalti") {
      //khalti payload
      const requestPayload = {
        return_url: `http://localhost:8000/api/khalti/callback`,
        website_url: `http://localhost:8000`,
        amount: req.body.totalPrice * 100,
        purchase_order_id: order._id,
        purchase_order_name: "Order " + order.customer,
      };

      const khalti = await khaltiPayment(requestPayload); //khalti payment gareko
      res.status(200).send({
        data: khalti,
        order_id: order._id,
        type: "khalti",
        message: "Redirecting to khalti.",
      });
    } else {
      res.status(200).send({
        data: order,
        type: "cash",
        message: "Order placed successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
