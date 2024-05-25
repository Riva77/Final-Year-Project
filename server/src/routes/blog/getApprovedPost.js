const router = require("express").Router();

const { Blog } = require("../../models/Blog"); //module import gareko

router.get("/", async (req, res) => {
  try {
    const blog = (await Blog.find().populate("user")).filter((blog) => {
      return blog.approval === "approved";
    }); //Overall user ko data fetch gareko

    //order by latest
    blog.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
