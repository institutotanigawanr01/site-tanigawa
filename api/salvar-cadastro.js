// api/salvar-cadastro.js
// API para salvar cadastro de mentorado no banco de dados

const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

// Configuração SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: (parseInt(process.env.SMTP_PORT) === 465),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    try {
        const data = req.body;

        // Validação
        if (!data.nome || !data.cpf || !data.email) {
            return res.status(400).json({ 
                status: 'falha', 
                message: 'Nome, CPF e email são obrigatórios.' 
            });
        }

        // Limpar CPF (remover pontos e traços)
        const cpfLimpo = data.cpf.replace(/[^\d]/g, '');

        // Verificar se CPF já existe
        const mentoradoExistente = await prisma.mentorado.findUnique({
            where: { cpf: cpfLimpo }
        });

        if (mentoradoExistente) {
            return res.status(400).json({
                status: 'falha',
                message: 'Este CPF já está cadastrado.'
            });
        }

        // Salvar no banco de dados
        const mentorado = await prisma.mentorado.create({
            data: {
                nome: data.nome,
                cpf: cpfLimpo,
                email: data.email,
                whatsapp: data.whatsapp || '',
                endereco: data.endereco || '',
                expectativas: data.expectativas || '',
                mentoriaEscolhida: data.mentoriaEscolhida || '',
                formaPagamento: data.formaPagamento || ''
            }
        });

        // Enviar email de notificação
        const emailContent = `
            <h2>🎯 Novo Cadastro de Mentoria Recebido</h2>
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>CPF:</strong> ${data.cpf}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>WhatsApp:</strong> ${data.whatsapp || 'N/A'}</p>
            <p><strong>Endereço:</strong> ${data.endereco || 'N/A'}</p>
            <p><strong>Mentoria Escolhida:</strong> ${data.mentoriaEscolhida || 'N/A'}</p>
            <p><strong>Forma de Pagamento:</strong> ${data.formaPagamento || 'N/A'}</p>
            <hr>
            <h3>Expectativas:</h3>
            <p>${data.expectativas ? data.expectativas.replace(/\n/g, '<br>') : 'N/A'}</p>
            <hr>
            <p><em>Cadastro salvo no banco de dados com ID: ${mentorado.id}</em></p>
        `;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.DESTINATION_EMAIL,
            replyTo: data.email,
            subject: `[CADASTRO URGENTE] Novo Mentorado: ${data.nome} (${data.mentoriaEscolhida || 'Synesis Grupo'})`,
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);

        console.log(`✅ Cadastro salvo: ${data.nome} (ID: ${mentorado.id})`);

        return res.status(200).json({ 
            status: 'sucesso', 
            message: 'Cadastro realizado com sucesso!',
            id: mentorado.id
        });

    } catch (error) {
        console.error('❌ Erro ao salvar cadastro:', error);
        
        return res.status(500).json({ 
            status: 'erro', 
            message: 'Erro ao processar cadastro. Tente novamente.',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};
