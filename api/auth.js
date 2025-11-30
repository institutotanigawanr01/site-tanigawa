// api/auth.js
// Vercel Serverless Function para Autenticação Segura

// CRÍTICO: O conteúdo das chaves é lido da Variável de Ambiente do Vercel
const KEYS_DATA = process.env.ADMIN_KEYS_JSON;

module.exports = async (req, res) => {
    
    // Configura headers para permitir chamadas do front-end (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }

    try {
        // 1. Busca o hash enviado pelo navegador
        const { keyHash } = req.body;

        if (!keyHash || keyHash.length !== 64) {
            return res.status(400).json({ status: 'falha', message: 'Formato de hash inválido.' });
        }
        
        // 2. Tenta fazer o parse do JSON das Variáveis de Ambiente
        let keys;
        try {
            if (!KEYS_DATA) {
                return res.status(500).json({ status: 'falha', message: 'Erro de configuração interna (ADMIN_KEYS_JSON).' });
            }
            keys = JSON.parse(KEYS_DATA);
        } catch (e) {
            return res.status(500).json({ status: 'falha', message: 'Erro de parse do JSON de chaves.' });
        }
        
        // 3. Valida o Hash
        const user = keys[keyHash];

        if (user) {
            // SUCESSO: Retorna APENAS os dados necessários para a sessão
            return res.status(200).json({
                status: 'sucesso',
                user: {
                    type: user.type,
                    nome: user.nome,
                    mentoria: user.mentoria || null,
                }
            });
        } else {
            // FALHA: Hash não encontrado
            return res.status(401).json({ status: 'falha', message: 'Chave inválida ou não cadastrada.' });
        }

    } catch (e) {
        console.error("Erro inesperado na API de autenticação:", e);
        return res.status(500).json({ status: 'falha', message: 'Erro interno inesperado.' });
    }
};