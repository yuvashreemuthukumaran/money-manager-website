import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

/**
 * @route   POST /api/transactions
 * @desc    Add income or expense
 */
router.post("/", async (req, res) => {
  try {
    const {
      type,
      amount,
      description,
      category,
      division,
      date,
      account
    } = req.body;

    // basic validation
    if (
      !type ||
      !amount ||
      !description ||
      !category ||
      !division ||
      !date
    ) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const transaction = new Transaction({
      type,
      amount,
      description,
      category,
      division,
      date,
      account
    });

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


/**
 * @route   GET /api/transactions
 * @desc    Get all transactions
 */
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/transactions/range
 * @desc    Get transactions between two dates
 * @query   startDate, endDate
 */
router.get("/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    const transactions = await Transaction.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**
 * @route   GET /api/transactions/summary
 * @desc    Get income & expense summary (weekly / monthly / yearly)
 * @query   period = week | month | year
 */
router.get("/summary", async (req, res) => {
  try {
    const { period } = req.query;

    let startDate = new Date();
    let endDate = new Date();

    if (period === "week") {
      startDate.setDate(endDate.getDate() - 7);
    } else if (period === "month") {
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    } else if (period === "year") {
      startDate = new Date(endDate.getFullYear(), 0, 1);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid period. Use week, month, or year." });
    }

    const transactions = await Transaction.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    res.status(200).json({
      period,
      income,
      expense,
      balance: income - expense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**
 * @route   PUT /api/transactions/:id
 * @desc    Edit transaction (allowed only within 12 hours)
 */
router.put("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // 12-hour restriction
    const TWELVE_HOURS = 12 * 60 * 60 * 1000;
    const timeDiff = Date.now() - new Date(transaction.createdAt).getTime();

    if (timeDiff > TWELVE_HOURS) {
      return res
        .status(403)
        .json({ message: "Editing not allowed after 12 hours" });
    }

    // Update allowed fields
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;