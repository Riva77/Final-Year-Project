const router = require("express").Router();
const { Blog } = require("../../models/Blog");
const { User } = require("../../models/Users");
const { sendBlogApprovalEmail } = require("../../services/email.service");

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { approval } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { approval: approval },
      { new: true }
    ).populate("user");

    await sendBlogApprovalEmail(blog.user.email, blog.title, approval);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
