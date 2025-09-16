const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Mảng lưu marker
let markers = [
  {
    id: "1",
    geocode: [21.02, 105.80],
    name: "Hà Nội",
    desc: "Hello",
    popup: "Hà Nội: Hello",
    iconSrc: "/img/marker-icon.png"
  },
  {
    id: "2",
    geocode: [21.03, 105.81],
    name: "HN2",
    desc: "Marker 2",
    popup: "HN2: Marker 2",
    iconSrc: "/img/marker-icon.png"
  }
];

// Test server
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Lấy danh sách marker
app.get("/api/markers", (req, res) => {
  res.json(markers);
});

// Thêm marker mới
app.post("/api/markers", (req, res) => {
  const { geocode, name, desc, iconSrc } = req.body;

  if (!geocode || !Array.isArray(geocode) || geocode.length !== 2) {
    return res.status(400).json({ error: "Geocode không hợp lệ" });
  }

  const id = Date.now().toString();
  const popup = `${name || ""}: ${desc || ""}`;

  const newMarker = {
    id,
    geocode,
    name: name || "",
    desc: desc || "",
    popup,
    iconSrc: iconSrc || "/img/marker-icon.png"
  };

  markers.push(newMarker);
  res.status(201).json(newMarker);
});
// Xóa marker theo id
app.delete("/api/markers/:id", (req, res) => {
  const { id } = req.params;
  console.log("Yêu cầu xoá id:", id);

  const index = markers.findIndex((m) => m.id.toString() === id.toString());

  if (index === -1) {
    return res.status(404).json({ error: "Không tìm thấy marker" });
  }

  const deleted = markers.splice(index, 1);
  res.json({ message: "Xóa thành công", deleted: deleted[0] });
});


app.listen(5000, () => console.log("Server chạy tại http://localhost:5000"));
