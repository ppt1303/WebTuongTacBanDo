const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let markers = [
  { geocode: [21.02, 105.80], popup: "Hello, tôi là Hà Nội" },
  { geocode: [21.03, 105.81], popup: "tôi là hà nội 2" }
];

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.get("/api/markers", (req, res) => {
  res.json(markers);
});

app.listen(5000, () => console.log("Server chạy tại http://localhost:5000"));
