const express = require("express");
const router = express.Router();
const { uploadFile, getFiles } = require("../controllers/fileController");
const upload = require("../middleware/upload");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/getFileList", getFiles);

module.exports = router;
