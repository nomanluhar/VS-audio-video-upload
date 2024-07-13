const File = require("../models/fileModel");
const fs = require("fs");
const path = require("path");
const { ffprobe, compressedVideo } = require("./ffmpegController");
const uploadToS3 = require("./s3FileUploadController");

const uploadFile = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const file = req.file;

    let duration = await getFileDuration(file.path);

    const fileUrl = await uploadToS3(file.path, file.mimetype);

    const obj = {
      name,
      title,
      description,
      fileUrl,
      fileType: file.mimetype,
      duration,
    };
    const fileMetadata = new File(obj);

    const saveFileResponse = await fileMetadata.save();

    // Trigger asynchronous compression process
    if (file.mimetype.startsWith("video/")) {
      console.log("Starting video compression");
      compressAndUpload(
        file.path,
        file.filename,
        file.mimetype,
        fileMetadata._id
      );
    }

    res.status(200).json({ message: "Success!", file: saveFileResponse });
  } catch (err) {
    console.error({ err });
    if (err.statusCode == 413) {
      res.status(413).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Failed to process file!" });
    }
  }
};

const getFileDuration = async (path) => {
  // Check file duration
  const metadata = await ffprobe(path);
  console.log({ metadata });
  const duration = metadata.format.duration;
  console.log({ duration });
  if (duration > 1800) {
    fs.unlinkSync(path);
    throw {
      statusCode: 413,
      message: "File duration exceeds 30 minutes",
    };
  }

  return duration;
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: "Failed to retrieve files" });
  }
};

const compressAndUpload = async (filePath, filename, mimeType, fileId) => {
  try {
    const compressedPath = path.join(
      __dirname,
      "..",
      "uploads",
      `compressed_${filename}`
    );

    await compressedVideo(filePath, compressedPath);
    console.log("Compression complete, file saved at:", compressedPath);

    const compressedFileUrl = await uploadToS3(compressedPath, mimeType);
    console.log("Compress File URL:", compressedFileUrl);
    await File.findByIdAndUpdate(fileId, { compressedFileUrl });
    fs.unlinkSync(compressedPath);
  } catch (err) {
    console.log({ err });
    console.log(err.message);
  }
};

module.exports = {
  uploadFile,
  getFiles,
};
