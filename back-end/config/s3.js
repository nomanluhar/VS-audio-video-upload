const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: "AKIA53RZGG5ZKM2325GY",
  secretAccessKey: "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",
  region: "us-east-1",
});

module.exports = s3;

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION,
// });
