const mongoose = require("mongoose");

const aggregationSchema = new mongoose.Schema(
  {
    totalOrders: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    averagePrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Aggregation = mongoose.model(
  "Aggregation",
  aggregationSchema
);

module.exports = Aggregation;