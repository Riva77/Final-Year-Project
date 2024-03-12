const router = require("express").Router();
const Order = require("../../models/Order.js");

router.get("/", async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $unwind: "$products", // Unwind the products array
      },
      {
        $group: {
          _id: "$products.product", // Grouping by product
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
          product: "$_id",
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
