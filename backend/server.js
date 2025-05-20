const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const COUNTER_FILE = './counter.json';

// Função para ler o contador
function readCounter() {
    if (!fs.existsSync(COUNTER_FILE)) {
        fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
    }
    const data = fs.readFileSync(COUNTER_FILE);
    return JSON.parse(data).count;
}

// Função para salvar o contador
function saveCounter(count) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
}

// GET: retorna o contador
app.get('/api/visitors', (req, res) => {
    const count = readCounter();
    res.json({ count });
});

// POST: incrementa o contador
app.post('/api/visitors', (req, res) => {
    let count = readCounter();
    count += 1;
    saveCounter(count);
    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
