const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const DB = path.join(__dirname, 'users.json');

function readDB() {
  try {
    const data = fs.readFileSync(DB);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}
function writeDB(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}


app.get('/', (req, res) => {
  res.send({ message: 'Hello from first-backend-Dyen' });
});


app.get('/users', (req, res) => {
  const users = readDB();
  res.json(users);
});


app.get('/users/:id', (req, res) => {
  const users = readDB();
  const u = users.find(x => String(x.id) === req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});


app.post('/users', (req, res) => {
  const users = readDB();
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });

  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const user = { id, name, email, createdAt: new Date().toISOString() };
  users.push(user);
  writeDB(users);
  res.status(201).json(user);
});


app.put('/users/:id', (req, res) => {
  const users = readDB();
  const idx = users.findIndex(x => String(x.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const { name, email } = req.body;
  if (name) users[idx].name = name;
  if (email) users[idx].email = email;
  users[idx].updatedAt = new Date().toISOString();
  writeDB(users);
  res.json(users[idx]);
});


app.delete('/users/:id', (req, res) => {
  let users = readDB();
  const idx = users.findIndex(x => String(x.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(idx, 1)[0];
  writeDB(users);
  res.json({ deleted });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
