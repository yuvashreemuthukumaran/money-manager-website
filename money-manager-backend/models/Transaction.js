import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    division: {
      type: String,
      enum: ["personal", "office"],
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    account: {
      type: String,
      default: "cash"
    }
  },
  {
    timestamps: true // creates createdAt & updatedAt
  }
);

export default mongoose.model("Transaction", transactionSchema);
