const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "TEST SERVER - HnilaBazar API",
    timestamp: new Date().toISOString(),
    pid: process.pid,
  });
});

// Addresses test route
app.get("/api/addresses", (req, res) => {
  res.json({
    success: true,
    message: "Addresses endpoint working from test server!",
    data: [],
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/addresses/test", (req, res) => {
  res.json({
    message: "Address test route working!",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`🧪 TEST SERVER running on port ${port}`);
  console.log(`📍 Process ID: ${process.pid}`);
  console.log(`🔗 Test URL: http://localhost:${port}`);
  console.log(`🔗 Addresses URL: http://localhost:${port}/api/addresses`);
});
