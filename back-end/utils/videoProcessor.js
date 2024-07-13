const ffmpeg = require("fluent-ffmpeg");

const checkDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata.format.duration);
      }
    });
  });
};

const compressVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec("libx264")
      .size("1280x720")
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
};

module.exports = {
  checkDuration,
  compressVideo,
};
