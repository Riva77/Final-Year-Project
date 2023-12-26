const router = require("express").Router();

const { Author } = require("../../models/Author.js"); //module import gareko

router.get("/", async (req, res) => {
  try {
    const author = await Author.find();
    if (!author) {
      return res.status(404).send({ message: "Author not found" });
    }

    return res.status(200).json(author);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
