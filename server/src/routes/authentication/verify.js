const router = require("express").Router();
const { User } = require("../../models/Users.js");

router.patch("/", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { isVerified: true }  
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
