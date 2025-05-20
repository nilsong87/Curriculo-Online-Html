const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://nilsong87.github.io', 'https://first-wealthy-rest.glitch.me']
}));
app.use(express.json());

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
