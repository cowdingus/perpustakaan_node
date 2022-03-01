require('dotenv').config();

const express = require("express");
const app = express();

const PORT = process.env["APP_PORT"] ?? 8080;

app.use(express.json());

// Routes
app.use("/api/anggota", require("./routes/anggota"));
app.use("/api/buku", require("./routes/buku"));
app.use("/api/petugas", require("./routes/petugas"));
app.use("/api/pinjam", require("./routes/pinjam"));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
