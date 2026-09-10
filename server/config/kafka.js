const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-order-system",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const retryConsumer = kafka.consumer({
  groupId: "order-retry-consumer-group",
});

module.exports = {
  kafka,
  producer,
  retryConsumer,
};