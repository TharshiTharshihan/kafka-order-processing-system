const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoute");
const { connectConsumer } = require("./consumer/orderConsumer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();
connectConsumer();
// Routes
app.use("/api/orders", orderRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Kafka Order API is running",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});