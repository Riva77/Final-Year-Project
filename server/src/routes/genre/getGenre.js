const router = require("express").Router();

const { Genre } = require("../../models/Genre.js"); //module import gareko

router.get("/", async (req, res) => {
  try {
    const genre = await Genre.find();
    if (!genre) {
      return res.status(404).send({ message: "Genre not found" });
    }

    return res.status(200).json(genre);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
