const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../../models/Users.js");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Invalid Email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Email or password" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ token, role:user.role, message: "Login Successfull" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server error" });
  }
});

module.exports = router;
