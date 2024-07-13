const s3 = require("../config/s3");
const fs = require("fs");
const path = require("path");

const uploadToS3 = async (filePath, mimeType) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: path.basename(filePath),
      Body: fileContent,
      ContentType: mimeType,
    };

    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    console.log({ err });
    throw err;
  }
};

module.exports = uploadToS3;
