import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Money Manager API is running");
});

app.use("/api/transactions", transactionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.error(err));
