// api/buscar-mentorado.js
// API para buscar dados de mentorado por CPF

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async (req, res) => {
    // CORS
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
        const { cpf } = req.query;

        if (!cpf) {
            return res.status(400).json({ 
                status: 'falha', 
                message: 'CPF é obrigatório.' 
            });
        }

        // Limpar CPF (remover pontos e traços)
        const cpfLimpo = cpf.replace(/[^\d]/g, '');

        // Buscar mentorado no banco
        const mentorado = await prisma.mentorado.findUnique({
            where: { cpf: cpfLimpo }
        });

        if (!mentorado) {
            return res.status(404).json({ 
                status: 'falha', 
                message: 'Mentorado não encontrado. Verifique o CPF.' 
            });
        }

        console.log(`✅ Mentorado encontrado: ${mentorado.nome}`);

        return res.status(200).json({ 
            status: 'sucesso', 
            data: mentorado
        });

    } catch (error) {
        console.error('❌ Erro ao buscar mentorado:', error);
        
        return res.status(500).json({ 
            status: 'erro', 
            message: 'Erro ao buscar dados. Tente novamente.',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};
