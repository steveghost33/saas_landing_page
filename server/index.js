// server/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "contacts.json");
fs.ensureFileSync(DATA_FILE);

let contacts = [];
try {
  contacts = fs.readJsonSync(DATA_FILE);
} catch {
  contacts = [];
  fs.writeJsonSync(DATA_FILE, contacts, { spaces: 2 });
}

app.post("/api/contact", async (req, res) => {
  const { name, email, service, date, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    service,
    date,
    message,
    receivedAt: new Date().toISOString(),
  };
  contacts.push(entry);
  await fs.writeJson(DATA_FILE, contacts, { spaces: 2 });
  res.json({ success: true, entry });
});

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});

module.exports = app;