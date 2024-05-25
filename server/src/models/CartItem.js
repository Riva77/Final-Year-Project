const mongoose = require("mongoose"); //mongoose lai import gareko, database connect ni garxa schema banauna ni help garxa

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //User ko reference deko. User chai foreign key
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", //Product ko reference deko. Product chai foreign key
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
