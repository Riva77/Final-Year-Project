const router = require("express").Router();

// Assuming you have a User model defined somewhere
const { User } = require("../../models/Users");

// PATCH route to handle adding/removing products from favorites
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;
    let msg = "";
    let type = "";

    // Check if userId and productId are provided
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "Both userId and productId are required." });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const index = user.favoriteBooks.indexOf(productId);
    console.log(index);

    if (index === -1) {
      // If productId is not in favorites, add it
      user.favoriteBooks.push(productId);
      msg = "Added to favourites.";
      type = "add";
    } else {
      // If productId is already in favorites, remove it
      user.favoriteBooks.splice(index, 1);
      msg = "Removed from favourites.";
      type = "remove";
    }

    // Save the updated user
    await user.save();

    // Send success response
    res.status(200).json({
      message: msg,
      data: user,
      type: type,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
