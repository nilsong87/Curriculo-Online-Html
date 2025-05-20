import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const count = await kv.get('visitors_count') || 0;
            return res.status(200).json({ count });
        }

        if (req.method === 'POST') {
            const count = await kv.incr('visitors_count');
            return res.status(200).json({ count });
        }

        res.status(405).json({ error: 'Método não permitido' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor', details: error.message });
    }
}