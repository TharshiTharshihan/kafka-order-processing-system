const fs = require("fs");
const path = require("path");
const avro = require("avsc");

const { kafka, retryConsumer } = require("../config/kafka");

const Order = require("../models/Order");
const Aggregation = require("../models/Aggregation");

const {
  publishRetryOrder,
  publishDLQOrder,
} = require("../producer/orderProducer");

// Load Avro schema
const schemaPath = path.join(__dirname, "../avro/order.avsc");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

// Create Avro type
const OrderType = avro.Type.forSchema(schema);

// Main Kafka consumer
const consumer = kafka.consumer({
  groupId: "order-consumer-group",
});

const MAX_RETRIES = 3;

// Sleep helper
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Get retry attempt from Kafka headers
const getRetryAttempt = (message) => {
  return Number(
    message.headers?.["retry-attempt"]?.toString() || "0"
  );
};

// Process order
const processOrder = async (order, attempt) => {
  /*
    These conditions are only for demonstrating
    retry and DLQ during the live presentation.
  */

  // Temporary failure:
  // Fails on first two attempts and succeeds later.
  if (order.product === "TEMP_FAIL" && attempt < 2) {
    throw new Error("Temporary processing failure");
  }

  // Permanent failure:
  // Always fails.
  if (order.product === "PERMANENT_FAIL") {
    throw new Error("Permanent processing failure");
  }

  // Check whether order was already processed
  const existingOrder = await Order.findOne({
    orderId: order.orderId,
  });

  if (existingOrder) {
    console.log(
      `Order ${order.orderId} already processed. Skipping duplicate.`
    );

    return;
  }

  // Save order
  const savedOrder = await Order.create({
    orderId: order.orderId,
    product: order.product,
    price: order.price,
    status: "processed",
  });

  console.log(
    `Order ${savedOrder.orderId} saved to MongoDB`
  );

  // Update running aggregation
  let aggregation = await Aggregation.findOne();

  if (!aggregation) {
    aggregation = await Aggregation.create({
      totalOrders: 1,
      totalPrice: order.price,
      averagePrice: order.price,
    });
  } else {
    aggregation.totalOrders += 1;
    aggregation.totalPrice += order.price;

    aggregation.averagePrice =
      aggregation.totalPrice / aggregation.totalOrders;

    await aggregation.save();
  }

  console.log(
    `Running average price: ${aggregation.averagePrice.toFixed(2)}`
  );
};

// Main orders consumer
const connectConsumer = async () => {
  await consumer.connect();

  console.log("Kafka consumer connected");

  await consumer.subscribe({
    topic: "orders",
    fromBeginning: true,
  });

  console.log("Kafka consumer subscribed to orders");

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      const order = OrderType.fromBuffer(message.value);

      const attempt = getRetryAttempt(message);

      console.log(
        `Received order ${order.orderId} from partition ${partition} (attempt ${attempt})`
      );

      try {
        await processOrder(order, attempt);
      } catch (error) {
        console.error(
          `Order ${order.orderId} failed: ${error.message}`
        );

        if (attempt >= MAX_RETRIES) {
          await publishDLQOrder(
            order,
            attempt,
            error.message
          );

          console.log(
            `Order ${order.orderId} moved to DLQ`
          );

          return;
        }

        const nextAttempt = attempt + 1;

        await publishRetryOrder(
          order,
          nextAttempt
        );
      }
    },
  });
};

// Retry consumer
const connectRetryConsumer = async () => {
  await retryConsumer.connect();

  console.log("Kafka retry consumer connected");

  await retryConsumer.subscribe({
    topic: "orders.retry",
    fromBeginning: true,
  });

  console.log("Kafka retry consumer subscribed to orders.retry");

  await retryConsumer.run({
    eachMessage: async ({ message }) => {
      const order = OrderType.fromBuffer(message.value);

      const attempt = getRetryAttempt(message);

      /*
        Exponential backoff:

        Attempt 1 → 1 second
        Attempt 2 → 2 seconds
        Attempt 3 → 4 seconds
      */
      const delay = Math.pow(2, attempt - 1) * 1000;

      console.log(
        `Retrying order ${order.orderId} - attempt ${attempt}`
      );

      console.log(
        `Waiting ${delay / 1000} second(s) before retry...`
      );

      await sleep(delay);

      await retryConsumer.pause([
        {
          topic: "orders.retry",
        },
      ]);

      try {
        const retryBuffer = OrderType.toBuffer(order);

        const { producer } = require("../config/kafka");

        await producer.connect().catch(() => {});

        await producer.send({
          topic: "orders",
          messages: [
            {
              key: String(order.orderId),
              value: retryBuffer,
              headers: {
                "retry-attempt": Buffer.from(
                  String(attempt)
                ),
              },
            },
          ],
        });

        console.log(
          `Order ${order.orderId} sent back to orders for retry ${attempt}`
        );
      } catch (error) {
        console.error(
          `Failed to send order ${order.orderId} back for retry:`,
          error.message
        );
      } finally {
        await retryConsumer.resume([
          {
            topic: "orders.retry",
          },
        ]);
      }
    },
  });
};

module.exports = {
  connectConsumer,
  connectRetryConsumer,
};