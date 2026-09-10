const express = require("express");

const {
  getOrders,
  createOrder,
} = require("../controllers/orderController");

const router = express.Router();

// GET all orders
router.get("/", getOrders);

// POST new order
router.post("/", createOrder);

module.exports = router;