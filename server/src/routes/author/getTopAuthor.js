const router = require("express").Router();
const Order = require("../../models/Order");

router.get("/", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.author",
          totalQuantity: { $sum: "$totalSold" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 4 },
      {
        $lookup: {
          from: "authors",
          localField: "_id",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" },
    ]);

    result.map((item) => ({
      author: item.authorDetails,
      totalQuantity: item.totalQuantity,
    }));
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in aggregation: ", error);
  }
});

module.exports = router;

