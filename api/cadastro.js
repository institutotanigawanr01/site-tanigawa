// api/cadastro.js
// Vercel Serverless Function para receber e NOTIFICAR sobre novo cadastro

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
        if (!data || !data.nome || !data.email || !data.mentoria) {
            return res.status(400).json({ status: 'falha', message: 'Dados obrigatórios não fornecidos.' });
        }

        // Criação do Conteúdo do E-mail (Detalhes completos do cadastro)
        const emailContent = `
            <h3>Novo Cadastro de Mentoria Recebido</h3>
            <p><strong>De:</strong> ${data.nome}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
            <p><strong>Mentoria Escolhida:</strong> ${data.mentoria} (${data.mentoriaPreco})</p>
            <p><strong>Forma de Pagamento:</strong> ${data.pagamento}</p>
            <hr>
            <h4>Detalhes do Contratante:</h4>
            <ul>
                <li><strong>CPF:</strong> ${data.cpf}</li>
                <li><strong>Endereço:</strong> ${data.endereco}, ${data.numero} - ${data.bairro}, ${data.cidade}/${data.estado}</li>
                <li><strong>Expectativas:</strong> ${data.expectativas}</li>
            </ul>
        `;

        // Envio do E-mail (CRÍTICO)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.DESTINATION_EMAIL, 
            subject: `[CADASTRO URGENTE] Novo Mentorando: ${data.nome} (${data.mentoria})`,
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);
        
        console.log(`✅ NOTIFICAÇÃO DE CADASTRO ENVIADA: ${data.nome}`);
        
        return res.status(200).json({ status: 'sucesso', message: 'Cadastro recebido e notificação enviada com sucesso.' });

    } catch (e) {
        console.error("❌ Erro fatal no processamento do cadastro/email:", e);
        // Retorna sucesso para o Front-end, mas com alerta, pois o erro está no backend (SMTP)
        return res.status(200).json({ 
             status: 'alerta', 
             message: 'Cadastro recebido, mas houve falha no envio da notificação por e-mail.' 
        });
    }
};