const Order = require("../models/Order");
const { publishOrder } = require("../producer/orderProducer");

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

const getStats = async (req, res) => {
  try {
    const Aggregation = require("../models/Aggregation");

    const aggregation = await Aggregation.findOne();

    if (!aggregation) {
      return res.status(200).json({
        success: true,
        stats: {
          totalOrders: 0,
          totalPrice: 0,
          averagePrice: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalOrders: aggregation.totalOrders,
        totalPrice: aggregation.totalPrice,
        averagePrice: aggregation.averagePrice,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get statistics",
      error: error.message,
    });
  }
};

// Create / publish order
const createOrder = async (req, res) => {
  try {
    const { orderId, product, price } = req.body;

    // Validate input
    if (!orderId || !product || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "orderId, product and price are required",
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    const order = {
      orderId: String(orderId),
      product: String(product),
      price: Number(price),
    };

    // Publish to Kafka
    await publishOrder(order);

    res.status(201).json({
      success: true,
      message: "Order published to Kafka",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to publish order",
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
  getStats
};