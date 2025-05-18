const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const mongoURI = 'mongodb://<nilsongomes>:<cocacola>@ac-ndq2glk-shard-00-00.4icxppw.mongodb.net:27017,ac-ndq2glk-shard-00-01.4icxppw.mongodb.net:27017,ac-ndq2glk-shard-00-02.4icxppw.mongodb.net:27017/?replicaSet=atlas-plwt62-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'; // Substitua com sua URI do MongoDB se usar o Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo para o contador de visitantes
const VisitorCountSchema = new mongoose.Schema({
    count: { type: Number, required: true },
});

const VisitorCount = mongoose.model('VisitorCount', VisitorCountSchema);

// Inicializar o contador na primeira execução
const initializeCounter = async () => {
    const countExists = await VisitorCount.findOne();
    if (!countExists) {
        await new VisitorCount({ count: 0 }).save();
    }
};

// Rota para obter a contagem
app.get('/api/visitors', async (req, res) => {
    try {
        const visitorData = await VisitorCount.findOne();
        res.json({ count: visitorData.count });
    } catch (error) {
        console.error('Erro ao obter a contagem:', error);
        res.status(500).json({ error: 'Erro ao obter a contagem' });
    }
});

// Rota para incrementar a contagem
app.post('/api/visitors', async (req, res) => {
    try {
        const visitorData = await VisitorCount.findOne();
        visitorData.count += 1;
        await visitorData.save();
        res.json({ count: visitorData.count });
    } catch (error) {
        console.error('Erro ao incrementar a contagem:', error);
        res.status(500).json({ error: 'Erro ao incrementar a contagem' });
    }
});

// Iniciar o servidor
app.listen(PORT, async () => {
    await initializeCounter();
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
