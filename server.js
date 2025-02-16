const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" }); // Temporary folder for uploaded files

app.use(cors());
app.use(express.static("public")); // Serves the frontend

// Serve the HTML upload form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API endpoint for file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
