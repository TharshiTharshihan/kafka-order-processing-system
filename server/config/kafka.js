const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-order-system",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

module.exports = {
  kafka,
  producer,
};