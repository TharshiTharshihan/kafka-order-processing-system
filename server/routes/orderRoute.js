const express = require("express");

const {
  getOrders,
  createOrder, getStats
} = require("../controllers/orderController");

const router = express.Router();

// GET all orders
router.get("/", getOrders);
router.get("/stats", getStats);

// POST new order
router.post("/", createOrder);

module.exports = router;