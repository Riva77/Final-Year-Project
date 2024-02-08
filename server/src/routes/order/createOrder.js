const router = require("express").Router(); //express bata router import gareko
const Order = require("../../models/Order.js");
router.post("/", async (req, res) => {
  //post method banako. backemd ma database ma data pathauna frontend bata aako data
  let body = { ...req.body }; //body ma chai frontend bata aako data store gareko

  try {
    // const { error } = validate(body); //f.E bata aako data validate gareko
    // if (error) {
    //   return res.status(400).send(error.details[0].message); //F.E bata field ko req.ment ma kei error aayo vani error throw garxa
    // }

    await new Order({ ...body }).save(); //backend ma data entry gareko
    res.status(201).send({ message: "Order placed successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
