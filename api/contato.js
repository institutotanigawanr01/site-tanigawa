// api/contato.js
// Vercel Serverless Function para receber e NOTIFICAR sobre novo contato

const nodemailer = require('nodemailer');

// Configuração SMTP (Lida das Variáveis de Ambiente do Vercel)
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
    
    // Configura headers para CORS
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
        
        // Validação Simples dos Dados
        if (!data || !data.nome || !data.email || !data.mensagem) {
            return res.status(400).json({ status: 'falha', message: 'Por favor, preencha nome, email e mensagem.' });
        }

        // Criação do Conteúdo do E-mail
        const emailContent = `
            <h3>Nova Mensagem de Contato Recebida</h3>
            <p><strong>De:</strong> ${data.nome}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Assunto:</strong> ${data.assunto || 'N/A'}</p>
            <hr>
            <h4>Mensagem:</h4>
            <p>${data.mensagem.replace(/\n/g, '<br>')}</p>
        `;

        // Envio do E-mail (CRÍTICO)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.DESTINATION_EMAIL, 
            replyTo: data.email, 
            subject: `[CONTATO] ${data.assunto || 'Nova Mensagem'} de ${data.nome}`,
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);
        
        console.log(`✅ NOTIFICAÇÃO DE CONTATO ENVIADA: ${data.nome}`);
        
        return res.status(200).json({ status: 'sucesso', message: 'Mensagem recebida e notificação enviada com sucesso.' });

    } catch (e) {
        console.error("❌ Erro fatal no processamento do contato/email:", e);
        return res.status(200).json({ 
             status: 'alerta', 
             message: 'Mensagem recebida, mas houve falha no envio da notificação por e-mail. Verifique os logs da Vercel.' 
        });
    }
};