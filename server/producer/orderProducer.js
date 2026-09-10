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

// Convert order object into Avro Buffer
const serializeOrder = (order) => {
  return OrderType.toBuffer({
    orderId: String(order.orderId),
    product: String(order.product),
    price: Number(order.price),
  });
};

// Publish a normal order to orders topic
const publishOrder = async (order) => {
  await connectProducer();

  const orderBuffer = serializeOrder(order);

  await producer.send({
    topic: "orders",
    messages: [
      {
        key: String(order.orderId),
        value: orderBuffer,
        headers: {
          "retry-attempt": Buffer.from("0"),
        },
      },
    ],
  });

  console.log(`Order ${order.orderId} published to Kafka`);

  return {
    success: true,
    message: "Order published to Kafka",
  };
};

// Publish failed order to retry topic
const publishRetryOrder = async (order, attempt) => {
  await connectProducer();

  const orderBuffer = serializeOrder(order);

  await producer.send({
    topic: "orders.retry",
    messages: [
      {
        key: String(order.orderId),
        value: orderBuffer,
        headers: {
          "retry-attempt": Buffer.from(String(attempt)),
        },
      },
    ],
  });

  console.log(
    `Order ${order.orderId} sent to retry topic (attempt ${attempt})`
  );
};

// Publish permanently failed order to DLQ
const publishDLQOrder = async (order, attempt, errorMessage) => {
  await connectProducer();

  const orderBuffer = serializeOrder(order);

  await producer.send({
    topic: "orders.DLQ",
    messages: [
      {
        key: String(order.orderId),
        value: orderBuffer,
        headers: {
          "retry-attempt": Buffer.from(String(attempt)),
          "error": Buffer.from(String(errorMessage)),
        },
      },
    ],
  });

  console.log(
    `Order ${order.orderId} sent to DLQ after ${attempt} attempts`
  );
};

module.exports = {
  connectProducer,
  publishOrder,
  publishRetryOrder,
  publishDLQOrder,
  serializeOrder,
  OrderType,
};