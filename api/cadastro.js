// api/cadastro.js
// Vercel Serverless Function para receber e NOTIFICAR sobre novo cadastro (cadastro-completo.html)

const nodemailer = require('nodemailer');

// -----------------------------------------------------------
// Configuração SMTP (Lida das Variáveis de Ambiente do Vercel)
// -----------------------------------------------------------
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: (parseInt(process.env.SMTP_PORT) === 465), // true for 465, false for other ports
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
        
        // 1. Validação Simples dos Dados
        if (!data || !data.nome || !data.email || !data.mentoria) {
            return res.status(400).json({ 
                status: 'falha', 
                message: 'Dados obrigatórios (nome, email, mentoria) não fornecidos.' 
            });
        }

        // 2. Criação do Conteúdo do E-mail
        const emailContent = `
            <h3>Novo Cadastro de Mentoria Recebido</h3>
            <p><strong>De:</strong> ${data.nome}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
            <p><strong>Mentoria Escolhida:</strong> ${data.mentoria} (${data.mentoriaPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})</p>
            <p><strong>Forma de Pagamento:</strong> ${data.pagamento}</p>
            <hr>
            <h4>Detalhes do Contratante:</h4>
            <ul>
                <li><strong>CPF:</strong> ${data.cpf}</li>
                <li><strong>Endereço:</strong> ${data.endereco}, ${data.numero} - ${data.bairro}, ${data.cidade}/${data.estado}</li>
                <li><strong>Como Conheceu:</strong> ${data.comoConheceu}</li>
            </ul>
            <hr>
            <p><strong>Expectativas:</strong> ${data.expectativas}</p>
            <p><strong>Aceite de Termos:</strong> ${data.aceiteContrato}</p>
            <p><strong>Newsletter:</strong> ${data.aceiteComunicacao}</p>
            <p><small>Enviado em: ${data.dataHora}</small></p>
        `;

        // 3. Envio do E-mail (CRÍTICO)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.DESTINATION_EMAIL, // E-mail de destino (o seu)
            subject: `[CADASTRO URGENTE] Novo Mentorando: ${data.nome} (${data.mentoria})`,
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);
        
        // Log de Confirmação
        console.log(`✅ NOTIFICAÇÃO DE CADASTRO ENVIADA: ${data.nome}`);
        
        // 4. Resposta de Sucesso ao Front-end
        return res.status(200).json({ 
            status: 'sucesso', 
            message: 'Cadastro recebido e notificação enviada com sucesso.'
        });

    } catch (e) {
        console.error("❌ Erro fatal no processamento do cadastro/email:", e);
        // Retorna sucesso ao Front-end APENAS se o erro for no envio do email (para não quebrar o funil)
        // Se for erro de validação (400), o erro é retornado acima
        return res.status(200).json({ 
             status: 'alerta', 
             message: 'Cadastro recebido, mas houve falha no envio da notificação por e-mail. Verifique os logs da Vercel.' 
        });
    }
};