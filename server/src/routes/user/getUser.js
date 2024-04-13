const router = require("express").Router();
const { User } = require("../../models/Users");

//:id chai hamro root url/endpoint
//backend data data get garni
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id; //request parameter bata id extract gareko
    const user = await User.findById(userId, { password: 0, __v: 0 }).populate(
      "favoriteBooks"
    ); //Id liyera user ko data fetch gareko tara password ra version field exclude gareko

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
