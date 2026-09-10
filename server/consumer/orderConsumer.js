const Aggregation = require("../models/Aggregation");
const fs = require("fs");
const path = require("path");
const avro = require("avsc");

const { kafka } = require("../config/kafka");
const Order = require("../models/Order");

const schemaPath = path.join(__dirname, "../avro/order.avsc");

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

const OrderType = avro.Type.forSchema(schema);

const consumer = kafka.consumer({
  groupId: "order-consumer-group",
});

const connectConsumer = async () => {
  await consumer.connect();

  console.log("Kafka consumer connected");

  await consumer.subscribe({
    topic: "orders",
    fromBeginning: true,
  });

  console.log("Kafka consumer subscribed to orders");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Deserialize Avro message
        const order = OrderType.fromBuffer(message.value);

        console.log(
          `Received order ${order.orderId} from partition ${partition}`,
        );

        // Save order to MongoDB
        const savedOrder = await Order.create({
          orderId: order.orderId,
          product: order.product,
          price: order.price,
          status: "processed",
        });

        console.log(`Order ${savedOrder.orderId} saved to MongoDB`);

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
          `Running average price: ${aggregation.averagePrice.toFixed(2)}`,
        );
      } catch (error) {
        console.error("Order consumer error:", error.message);
      }
    },
  });
};

module.exports = {
  connectConsumer,
};
