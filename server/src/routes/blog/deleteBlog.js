const router = require("express").Router();
const { Blog } = require("../../models/Blog");

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
