const ffmpeg = require("fluent-ffmpeg");

// Set the paths for ffmpeg and ffprobe
ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");
ffmpeg.setFfprobePath("/usr/bin/ffprobe");

const ffprobe = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });
};

const compressedVideo = (filePath, compressedPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .output(compressedPath)
      .videoCodec("libx264")
      .size("1280x720")
      .outputOptions("-preset ultrafast") 
      .on("progress", (progress) => {
        console.log(`Processing: ${progress.percent}%`);
      })
      .on("end", () => {
        console.log(
          `File compressed successfully and saved to ${compressedPath}`
        );
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error compressing video: ${err.message}`);
        reject(err);
      })
      .run();
  });
};

module.exports = { ffprobe, compressedVideo };
