import { put, get } from '@vercel/blob';

const BLOB_KEY = 'visitors/count.txt';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // GET: retorna o contador
        if (req.method === 'GET') {
            const blob = await get(BLOB_KEY);
            let count = 0;
            if (blob && blob.body) {
                const text = await blob.text();
                count = parseInt(text, 10) || 0;
            }
            return res.status(200).json({ count });
        }

        // POST: incrementa o contador
        if (req.method === 'POST') {
            // Lê o valor atual
            const blob = await get(BLOB_KEY);
            let count = 0;
            if (blob && blob.body) {
                const text = await blob.text();
                count = parseInt(text, 10) || 0;
            }
            count++;
            // Salva o novo valor
            await put(BLOB_KEY, String(count), { access: 'public' });
            return res.status(200).json({ count });
        }

        res.status(405).json({ error: 'Método não permitido' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor', details: error.message });
    }
}