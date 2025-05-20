const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Força CORS para qualquer origem e métodos
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());
app.use(express.json());

// Tratar requisições OPTIONS para CORS pré-flight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

// Use a pasta .data para persistência no Glitch
const COUNTER_FILE = '.data/counter.json';

function readCounter() {
    if (!fs.existsSync(COUNTER_FILE)) {
        fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
    }
    const data = fs.readFileSync(COUNTER_FILE);
    return JSON.parse(data).count;
}

function saveCounter(count) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
}

app.get('/api/visitors', (req, res) => {
    const count = readCounter();
    res.json({ count });
});

app.post('/api/visitors', (req, res) => {
    let count = readCounter();
    count += 1;
    saveCounter(count);
    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
