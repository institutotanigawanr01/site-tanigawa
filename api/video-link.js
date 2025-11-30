// api/video-link.js
// Vercel Serverless Function para gerar link de vídeo tokenizado (segurança de conteúdo)

// ATENÇÃO: Esta é uma chave de API secreta de um serviço como Vimeo Pro ou Cloudflare Stream
// Você deve configurar esta variável no Dashboard do Vercel!
const VIMEO_SECRET_TOKEN = process.env.VIMEO_SECRET_TOKEN || "SECRETO_PLACEHOLDER";

module.exports = async (req, res) => {
    
    // Configura headers para permitir chamadas do front-end (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método não permitido. Use GET.' });
    }

    try {
        // Recebe o ID da aula pela URL (Query Parameter)
        const videoId = req.query.id;

        if (!videoId) {
            return res.status(400).json({ 
                status: 'falha', 
                message: 'ID do vídeo não fornecido.' 
            });
        }
        
        // -----------------------------------------------------------
        // 1. VERIFICAÇÃO DE PERMISSÃO DE ACESSO (CRÍTICO)
        // -----------------------------------------------------------
        
        // CRÍTICO: Idealmente, aqui você verificaria a sessão do usuário ou um token de permissão
        // para garantir que ele TEM direito a ver esta aula (ex: ele pagou pelo SYNESIS).
        // Por enquanto, assumimos que se ele chegou aqui, está autenticado (protegido pelo front-end).

        // -----------------------------------------------------------
        // 2. GERAÇÃO DO LINK SEGURO (MOCK/SIMULAÇÃO)
        // -----------------------------------------------------------
        
        let secureUrl = '';
        
        if (VIMEO_SECRET_TOKEN === "SECRETO_PLACEHOLDER") {
            // Se a chave secreta não foi configurada, usamos um mock para não quebrar o site
            console.warn(`[AVISO DE SEGURANÇA] - TOKEN SECRETO NÃO CONFIGURADO. Usando URL de placeholder para o Vídeo ID: ${videoId}`);
            secureUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&lesson=${videoId}`; // Rickroll, para garantir que o link seja alterado!
        } else {
            /*
             * CRÍTICO: Aqui você implementaria a lógica REAL.
             * Ex: Usar o 'VIMEO_SECRET_TOKEN' para chamar a API do Vimeo/Cloudflare
             * e receber um URL assinado/tokenizado que expira em 1 hora.
             * * Exemplo (Pseudocódigo):
             * const client = new Vimeo.Client(VIMEO_SECRET_TOKEN);
             * const response = await client.getSecureLink(videoId);
             * secureUrl = response.signed_url;
            */
             secureUrl = `https://seuservico.com/embed/${videoId}?token=FAKE_SECURE_${Date.now()}`;
        }


        // 3. Resposta de Sucesso
        return res.status(200).json({ 
            status: 'sucesso', 
            secureUrl: secureUrl 
        });

    } catch (e) {
        console.error("Erro no processamento da solicitação de vídeo:", e);
        return res.status(500).json({ 
            status: 'falha', 
            message: 'Erro interno ao gerar link seguro.' 
        });
    }
};