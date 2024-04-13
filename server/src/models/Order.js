const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentType: {
    type: String,
    default: "Cash On Delivery",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  transactionId: {
    type: String,
  },
  status: {
    type: "string",
    default: "Received",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
