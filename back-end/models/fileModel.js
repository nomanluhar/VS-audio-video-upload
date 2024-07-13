const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  fileUrl: String,
  fileType: String,
  duration: Number,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
