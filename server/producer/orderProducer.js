const fs = require("fs");
const path = require("path");
const avro = require("avsc");

const { producer } = require("../config/kafka");

// Load Avro schema
const schemaPath = path.join(__dirname, "../avro/order.avsc");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

// Create Avro type
const OrderType = avro.Type.forSchema(schema);

let producerConnected = false;

const connectProducer = async () => {
  if (!producerConnected) {
    await producer.connect();
    producerConnected = true;

    console.log("Kafka producer connected");
  }
};

const publishOrder = async (order) => {
  await connectProducer();

  // Validate order against Avro schema
  const orderBuffer = OrderType.toBuffer({
    orderId: String(order.orderId),
    product: String(order.product),
    price: Number(order.price),
  });

  await producer.send({
    topic: "orders",
    messages: [
      {
        key: String(order.orderId),
        value: orderBuffer,
      },
    ],
  });

  console.log(`Order ${order.orderId} published to Kafka`);

  return {
    success: true,
    message: "Order published to Kafka",
  };
};

module.exports = {
  connectProducer,
  publishOrder,
};