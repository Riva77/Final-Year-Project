const router = require("express").Router();
const Order = require("../../models/Order.js");
const { Product } = require("../../models/Product.js");

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
    ]);

    const products = [];
    for (const item of topProducts) {
      const product = await Product.findById(item.product).populate("author");
      if (product) {
        products.push({
          product,
          totalOrders: item.totalOrders,
        });
      } else {
        // Fetch another product from the sorted list
        const nextProduct = await Product.findOne({
          _id: { $nin: products.map((p) => p.product._id) },
        }).populate("author");
        if (nextProduct) {
          products.push({
            product: nextProduct,
            totalOrders: item.totalOrders,
          });
        } else {
          // If no replacement product found, return a placeholder
          products.push({
            product: { name: "Product Not Found", price: 0 },
            totalOrders: item.totalOrders,
          });
        }
      }
    }

    res.status(200).send(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;