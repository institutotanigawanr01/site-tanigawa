// api/newsletter.js
// Vercel Serverless Function para receber inscrições na Newsletter

module.exports = async (req, res) => {
    
    // Configura headers para permitir chamadas do front-end (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Responde a requisições OPTIONS
        return res.status(200).send('ok');
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    try {
        const data = req.body;
        
        // 1. Validação Simples dos Dados
        if (!data || !data.email) {
            return res.status(400).json({ 
                status: 'falha', 
                message: 'Campo de email obrigatório.' 
            });
        }

        // 2. Logs de Confirmação
        console.log(`✉️ NOVA INSCRIÇÃO NEWSLETTER:`);
        console.log(`   Email: ${data.email}`);
        
        // -----------------------------------------------------------
        // 3. AÇÃO DE INTEGRAÇÃO (IMPLEMENTAÇÃO FUTURA)
        // -----------------------------------------------------------
        
        /*
        * CRÍTICO: Aqui você deve adicionar a lógica real para integrar este e-mail
        * com seu serviço de email marketing (Mailchimp, ActiveCampaign, etc.).
        *
        * Exemplo de Ação Necessária:
        * 1. await addToEmailMarketingList(data.email);
        */
        
        // 4. Resposta de Sucesso ao Front-end
        return res.status(200).json({ 
            status: 'sucesso', 
            message: 'Inscrição na newsletter recebida.'
        });

    } catch (e) {
        console.error("Erro no processamento da newsletter:", e);
        return res.status(500).json({ 
            status: 'falha', 
            message: 'Erro interno no servidor Vercel.' 
        });
    }
};
