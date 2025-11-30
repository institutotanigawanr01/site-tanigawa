// api/auth.js
// Vercel Serverless Function para Autenticação Segura
// Função: Receber hash e validar no lado do servidor, usando Environment Variable (ADMIN_KEYS_JSON)

// CRÍTICO: O conteúdo das chaves é lido da Variável de Ambiente do Vercel
const KEYS_DATA = process.env.ADMIN_KEYS_JSON;

module.exports = async (req, res) => {
    // A Vercel espera uma função async que recebe (req, res)
    
    // Configura headers para permitir chamadas do front-end (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Responde a requisições OPTIONS (pré-voo) com sucesso
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
                console.error("Variável de ambiente ADMIN_KEYS_JSON não configurada.");
                return res.status(500).json({ status: 'falha', message: 'Erro interno na validação.' });
            }
            keys = JSON.parse(KEYS_DATA);
        } catch (e) {
            console.error("Erro ao fazer parse do JSON de chaves:", e);
            return res.status(500).json({ status: 'falha', message: 'Erro de configuração no servidor.' });
        }
        
        // 3. Valida o Hash
        const user = keys[keyHash];

        if (user) {
            // SUCESSO: Retorna APENAS os dados necessários para a sessão, sem expor outros hashes
            // CRÍTICO: Não retorna o hash completo!
            return res.status(200).json({
                status: 'sucesso',
                user: {
                    type: user.type,
                    nome: user.nome,
                    mentoria: user.mentoria || null,
                    // Hash parcial para exibição no Admin (se necessário)
                    partialHash: keyHash.slice(-6)
                }
            });
        } else {
            // FALHA: Hash não encontrado
            return res.status(200).json({ status: 'falha', message: 'Chave inválida.' });
        }

    } catch (e) {
        console.error("Erro inesperado na API de autenticação:", e);
        return res.status(500).json({ status: 'falha', message: 'Erro interno inesperado.' });
    }
};