const router = require("express").Router();

const Blog = require("../../models/Blog"); //module import gareko

router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find(); //Overall user ko data fetch gareko

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;