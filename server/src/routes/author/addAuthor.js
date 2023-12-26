const router = require("express").Router();
const { Author, validate } = require("../../models/Author.js");

router.post("/", async (req, res) => {
  //post method banako. backemd ma database ma data pathauna frontend bata aako data
  let body = { ...req.body }; //body ma chai frontend bata aako data store gareko

  try {
    const { error } = validate(body); //f.E bata aako data validate gareko
    if (error) {
      return res.status(400).send(error.details[0].message); //F.E bata field ko req.ment ma kei error aayo vani error throw garxa
    }
    const author = await Author.findOne({ name: body.name }); //pailai bata yo email vako user xaki xaina check gareko

    if (author) {
      return res.status(409).send({ message: "Author already exist" });
    }
    await new Author({ ...body }).save(); //backend ma data entry gareko
    res.status(201).send({ message: "Author added successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
