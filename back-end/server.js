const express = require("express");
const cors = require('cors');
const connectDB = require("./config/database");
const fileRoutes = require("./routes/fileRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

// Use routes
app.use("/api/files", fileRoutes);

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
