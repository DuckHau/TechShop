import { Schema, model } from "mongoose";
// A
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Schema.Types.Decimal128,
    default: 0,
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      payablePrice: {
        type: Number,
        required: true,
      },
      purchasedQty: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "cancelled", "refund"],
  },
  paymentType: {
    type: String,
    enum: ["COD", "VNPAY PAYMENT", "PAYOS"],
    default: "COD",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["ordered", "processing", "delivered", "cancelled"],
    default: "ordered",
  },
  // address: {
  //   type: String,
  // },
  // phone: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
