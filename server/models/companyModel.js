const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    address: {
      street: { type: String, required: [true, "Street address is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        match: [/^\d{6}$/, "Please provide a valid postal code"],
      },
      country: { type: String, required: [true, "Country is required"] },
    },
    contactPhone: {
      type: String,
      required: [true, "Contact phone is required"],
      match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
      unique: true,
    },
    companyLogo: {
      type: String,
      default: null,
    },
    stockDetails: {
      type: [
        {
          symbol: { type: String, required: true },
          quantity: { type: Number, required: true, min: 0 },
          currentPrice: { type: Number, required: true, min: 0 },
        },
      ],
      default: [],
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please provide a valid URL",
      ],
      default: null,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: null,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "company"],
      default: "company",
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
