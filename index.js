const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Dummy in-memory database
let users = [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "budi", role: "pegawai" }
];

let projects = [
  { id: 1, name: "Proyek Alpha" },
  { id: 2, name: "Proyek Beta" }
];

let reports = [];

// Routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  users = users.map(u => u.id == id ? { ...u, role } : u);
  res.sendStatus(200);
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const newProject = { id: Date.now(), name: req.body.name };
  projects.push(newProject);
  res.json(newProject);
});

app.get("/api/reports", (req, res) => {
  res.json(reports);
});

app.post("/api/reports", (req, res) => {
  const newReport = { id: Date.now(), ...req.body };
  reports.push(newReport);
  res.json(newReport);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
