// api/diagnostico.js
// Vercel Serverless Function para receber e NOTIFICAR sobre novo Diagnóstico PEAD

const nodemailer = require('nodemailer');

// -----------------------------------------------------------
// Configuração SMTP (Lida das Variáveis de Ambiente do Vercel)
// -----------------------------------------------------------
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: (parseInt(process.env.SMTP_PORT) === 465), // true for 465 (Gmail default)
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
        
        // 1. Validação Simples dos Dados (CRÍTICO)
        if (!data || !data.nome || !data.email || !data.perfil || !data.mentoriaRecomendada) {
            console.error("Dados de diagnóstico incompletos:", data);
            return res.status(400).json({ 
                status: 'falha', 
                message: 'Dados obrigatórios (nome, email, perfil, recomendação) não fornecidos.' 
            });
        }

        // 2. Formatação das Respostas
        const respostasHtml = Object.keys(data.respostas || {}).map(key => {
            return `<li><strong>${key.toUpperCase()}:</strong> ${data.respostas[key]} pontos</li>`;
        }).join('');

        // 3. Criação do Conteúdo do E-mail
        const emailContent = `
            <h3>Novo Resultado de Diagnóstico PEAD Recebido</h3>
            <p><strong>De:</strong> ${data.nome}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <hr>
            <h4>Resultado Principal:</h4>
            <p style="font-size: 1.2em;">O perfil dominante do(a) cliente ${data.nome} é:</p>
            <h3 style="color: #3b82f6; font-size: 1.5em;">${data.perfil}</h3>
            
            <p style="font-size: 1.1em; color: #f59e0b;"><strong>Recomendação de Mentoria:</strong> ${data.mentoriaRecomendada}</p>
            <hr>
            
            <h4>Detalhe dos Scores (P, E, A, D):</h4>
            <ul>${respostasHtml}</ul>

            <p><strong>Ação Sugerida:</strong> Contate ${data.nome} imediatamente com o link de pagamento ou um convite para o primeiro passo na Mentoria ${data.mentoriaRecomendada}.</p>
            <p><small>Enviado em: ${new Date().toLocaleString('pt-BR')}</small></p>
        `;

        // 4. Envio do E-mail (CRÍTICO)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.DESTINATION_EMAIL, // E-mail de destino (o seu)
            replyTo: data.email, // Permite responder diretamente ao cliente
            subject: `[DIAGNÓSTICO] Perfil ${data.perfil} - Contato de ${data.nome}`,
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);
        
        // Log de Confirmação
        console.log(`✅ NOTIFICAÇÃO DE DIAGNÓSTICO ENVIADA: ${data.nome}`);
        
        // 5. Resposta de Sucesso ao Front-end
        return res.status(200).json({ 
            status: 'sucesso', 
            message: 'Diagnóstico recebido e notificação enviada com sucesso.'
        });

    } catch (e) {
        console.error("❌ Erro fatal no processamento do diagnóstico/email:", e);
        // Retorna alerta ao Front-end caso haja falha no SMTP
        return res.status(200).json({ 
             status: 'alerta', 
             message: 'Diagnóstico recebido, mas houve falha no envio da notificação por e-mail. Verifique os logs da Vercel.' 
        });
    }
};