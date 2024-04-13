const router = require("express").Router();
const Author = require("../../models/Author.js");

router.get("/", async (req, res) => {
  try {
    const topAuthor = await Author.aggregate([
      {
        $unwind: "$authors", // Unwind the products array
      },
      {
        $group: {
          _id: "$authors.author", 
          totalOrders: { $sum: 1 }, // Counting total orders for each product
        },
      },
      {
        $sort: { totalOrders: -1 }, // Sorting in descending order of totalOrders
      },
      {
        $limit: 4, // Limiting to top 4 products
      },
      {
        $project: {
          author: "$_id",
          totalOrders: 1,
        },
      },
    ]).exec();

    // Populate the products
    //
    const populatedProducts = await Order.populate(topProducts, {
      path: "product",
      model: "Product",
    });

    res.status(200).send(populatedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;