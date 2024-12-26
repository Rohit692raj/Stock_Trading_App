const mongoose = require("mongoose");

const priceFluctuationSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    stockSymbol: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const PriceFluctuation = mongoose.model(
  "PriceFluctuation",
  priceFluctuationSchema
);

module.exports = PriceFluctuation;
