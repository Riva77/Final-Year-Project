const router = require("express").Router();

const  Blog  = require("../../models/Blog");

router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("user"); //Id liyera product ko data fetch gareko

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
