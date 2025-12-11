<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório – Útero do Propósito</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #1a2b4a 0%, #2d4a7c 100%);
            min-height: 100vh;
            color: #ffffff;
            overflow-x: hidden;
        }

        .container {
            max-width: 960px;
            margin: 0 auto;
            padding: 40px 20px 60px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            font-size: 2.6em;
            font-weight: 700;
            color: #d4af37;
            text-shadow: 0 2px 10px rgba(212, 175, 55, 0.35);
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1em;
            color: #5b8fd9;
        }

        .tag {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 999px;
            border: 1px solid rgba(212, 175, 55, 0.6);
            font-size: 0.85em;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #f4d03f;
            margin-bottom: 16px;
        }

        .card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 28px 26px;
            margin-bottom: 24px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .card h2 {
            font-size: 1.4em;
            color: #d4af37;
            margin-bottom: 8px;
        }

        .card h3 {
            font-size: 1.1em;
            color: #5b8fd9;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.09em;
        }

        .card p {
            font-size: 0.98em;
            line-height: 1.7;
            color: #ffffff;
            margin-bottom: 8px;
        }

        .card ul {
            list-style: none;
            padding-left: 0;
        }

        .card ul li {
            padding-left: 20px;
            position: relative;
            margin-bottom: 8px;
            line-height: 1.6;
        }

        .card ul li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #d4af37;
            font-weight: bold;
        }

        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            margin-top: 12px;
        }

        .section-title {
            font-size: 1.5em;
            color: #f4d03f;
            margin: 26px 0 12px;
        }

        .proposito-central {
            text-align: center;
            padding: 28px 22px 30px;
            background: radial-gradient(circle at top, rgba(244, 208, 63, 0.18) 0%, rgba(10, 14, 39, 0.2) 52%, rgba(0,0,0,0.5) 100%);
            border-radius: 24px;
            border: 1px solid rgba(244, 208, 63, 0.4);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            margin-bottom: 32px;
        }

        .proposito-central h2 {
            font-size: 1em;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #f4d03f;
            margin-bottom: 6px;
        }

        .proposito-central h3 {
            font-size: 0.86em;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 14px;
        }

        .proposito-central p {
            font-size: 1.35em;
            line-height: 1.8;
        }

        .proposito-central span {
            color: #ffffff;
            font-weight: 700;
        }

        .sub-label {
            font-size: 0.8em;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #5b8fd9;
            margin-bottom: 4px;
        }

        .mapa-rapido-list {
            list-style: none;
            margin-top: 10px;
        }

        .mapa-rapido-list li {
            margin-bottom: 8px;
            font-size: 0.96em;
        }

        .mapa-rapido-list strong {
            color: #f4d03f;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 0.9em;
            color: rgba(255, 255, 255, 0.7);
        }

        .footer span {
            color: #f4d03f;
        }

        .btn {
            margin-top: 22px;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
            color: #1a2b4a;
            border: none;
            padding: 12px 26px;
            font-size: 0.95em;
            font-weight: 600;
            border-radius: 999px;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 4px 14px rgba(212, 175, 55, 0.4);
        }

        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 7px 24px rgba(212, 175, 55, 0.6);
        }

        .btn:active {
            transform: translateY(0);
        }

        @media (max-width: 780px) {
            .grid-2 {
                grid-template-columns: 1fr;
            }

            .header h1 {
                font-size: 2.1em;
            }

            .proposito-central p {
                font-size: 1.1em;
            }

            .container {
                padding: 28px 16px 40px;
            }
        }
    </style>
</head>
<body>
<div class="container">

    <div class="header">
        <div class="tag">Relatório Gestacional de Propósito</div>
        <h1>Útero do Propósito</h1>
        <p>Análise personalizada das suas respostas</p>
    </div>

    <!-- PROPÓSITO CENTRAL -->
    <div class="proposito-central">
        <h2>DECLARAÇÃO CENTRAL</h2>
        <h3>Tema central da sua vida</h3>
        <p id="proposito-central-texto">
            <span>PROPÓSITO EM FORMAÇÃO</span>
        </p>
    </div>

    <!-- PONTOS FORTES -->
    <h2 class="section-title">✨ Pontos Fortes Identificados</h2>
    <div class="card">
        <h3>O que mais se destaca em você</h3>
        <ul id="lista-pontos-fortes">
            <li>Analisando...</li>
        </ul>
    </div>

    <!-- PONTOS DE ATENÇÃO -->
    <h2 class="section-title">⚠️ Pontos de Atenção</h2>
    <div class="card">
        <h3>Áreas de alinhamento e crescimento</h3>
        <ul id="lista-pontos-atencao">
            <li>Analisando...</li>
        </ul>
    </div>

    <!-- PLANO DE AÇÃO -->
    <h2 class="section-title">🎯 Plano de Ação Personalizado</h2>
    
    <div class="grid-2">
        <div class="card">
            <h3>📅 Próximos 30 Dias</h3>
            <ul id="plano-30"></ul>
        </div>

        <div class="card">
            <h3>📅 Próximos 90 Dias</h3>
            <ul id="plano-90"></ul>
        </div>
    </div>

    <div class="card">
        <h3>📅 Próximos 180 Dias</h3>
        <ul id="plano-180"></ul>
    </div>

    <!-- MAPA RÁPIDO -->
    <h2 class="section-title">Mapa Rápido</h2>
    <div class="card">
        <ul class="mapa-rapido-list">
            <li><strong>Verbo dominante:</strong> <span id="mapa-verbo"></span></li>
            <li><strong>Pessoas-alvo:</strong> <span id="mapa-pessoas"></span></li>
            <li><strong>Condição:</strong> <span id="mapa-condicao"></span></li>
        </ul>

        <button class="btn" onclick="window.location.href='utero-base.html'">
            ↩ Voltar para o Útero do Propósito
        </button>
        
        <button class="btn" onclick="window.print()" style="margin-left: 10px;">
            🖨️ Imprimir / PDF
        </button>
    </div>

    <div class="footer">
        Este relatório é <span>personalizado</span> baseado nas suas respostas.<br>
        Gerado pelo Motor Synesis – Instituto Tanigawa
    </div>
</div>

<script>
    // MOTOR DE ANÁLISE SYNESIS - VERSÃO COMPLETA
    function analisarProposito() {
        // 1. COLETAR TODAS AS RESPOSTAS
        const respostas = {};
        const campos = [
            'concepcao1', 'concepcao2', 'concepcao3',
            'implantacao1', 'implantacao2', 'implantacao3',
            'batimento1', 'batimento2', 'batimento3',
            'membros1', 'membros2', 'membros3',
            'chute1', 'chute2', 'chute3',
            'olhos1', 'olhos2', 'olhos3',
            'respiracao1', 'respiracao2', 'respiracao3',
            'voz1', 'voz2', 'voz3',
            'parto1', 'parto2', 'parto3'
        ];
        
        campos.forEach(campo => {
            respostas[campo] = (localStorage.getItem(campo) || '').trim();
        });

        // 2. JUNTAR TUDO E ANALISAR
        const textoCompleto = Object.values(respostas).join(' ').toLowerCase();
        
        // 3. PADRÕES DE DETECÇÃO
        const padroes = {
            verbos: {
                'LIBERTAR': ['libert', 'free', 'soltar', 'desacorrent'],
                'CURAR': ['curar', 'cura', 'restaur', 'sarar', 'reden'],
                'FORMAR': ['ensinar', 'educar', 'formar', 'capacit', 'treinar'],
                'CONSTRUIR': ['construir', 'edificar', 'desenvolv', 'criar'],
                'DESPERTAR': ['despertar', 'acordar', 'revel', 'iluminar'],
                'GUIAR': ['guiar', 'conduzir', 'orientar', 'direcionar', 'liderar'],
                'TRANSFORMAR': ['transform', 'mudar', 'converter', 'renovar']
            },
            
            destinatarios: {
                'JOVENS': ['jovem', 'jovens', 'adolesc', 'juventude'],
                'MULHERES': ['mulher', 'mulheres', 'feminino'],
                'HOMENS': ['homem', 'homens', 'masculino', 'pai', 'pais'],
                'LÍDERES': ['líder', 'líderes', 'lider', 'liderança', 'pastor'],
                'CRIANÇAS': ['criança', 'crianças', 'infantil'],
                'EMPRESÁRIOS': ['empresár', 'empreended', 'negócio'],
                'FAMÍLIAS': ['família', 'familias', 'casal']
            },
            
            condicoes: {
                'FERIDOS': ['ferido', 'machucado', 'quebrado', 'dor', 'trauma'],
                'APRISIONADOS': ['preso', 'aprisionado', 'cativo', 'escrav'],
                'PERDIDOS': ['perdido', 'sem rumo', 'desorienta', 'confuso'],
                'ÓRFÃOS': ['órfão', 'órfãos', 'abandona', 'rejeitado'],
                'OPRIMIDOS': ['oprimido', 'injustiça', 'sofrendo']
            }
        };

        // 4. CALCULAR PESOS
        function calcularPeso(categoria) {
            const resultado = {};
            for (const [nome, palavras] of Object.entries(padroes[categoria])) {
                let peso = 0;
                palavras.forEach(palavra => {
                    const regex = new RegExp(palavra, 'gi');
                    const matches = textoCompleto.match(regex);
                    if (matches) peso += matches.length;
                });
                resultado[nome] = peso;
            }
            return resultado;
        }

        const pesosVerbos = calcularPeso('verbos');
        const pesosDestinatarios = calcularPeso('destinatarios');
        const pesosCondicoes = calcularPeso('condicoes');

        // 5. ENCONTRAR DOMINANTES
        function getDominante(pesos) {
            let max = 0;
            let dominante = null;
            for (const [nome, peso] of Object.entries(pesos)) {
                if (peso > max) {
                    max = peso;
                    dominante = nome;
                }
            }
            return dominante;
        }

        const verboDominante = getDominante(pesosVerbos) || 'TRANSFORMAR';
        const destinatarioDominante = getDominante(pesosDestinatarios) || 'PESSOAS';
        const condicaoDominante = getDominante(pesosCondicoes) || 'PERDIDAS';

        // 6. GERAR DECLARAÇÃO
        const declaracaoCurta = `${verboDominante} ${destinatarioDominante} ${condicaoDominante}`;

        // 7. GERAR PONTOS FORTES
        const pontosFortes = [];
        
        if (textoCompleto.includes('discern') || textoCompleto.includes('perceb') || textoCompleto.includes('enxerg')) {
            pontosFortes.push('Capacidade aguçada de discernimento e percepção espiritual');
        }
        if (textoCompleto.includes('empatia') || textoCompleto.includes('compaixão') || textoCompleto.includes('sinto a dor')) {
            pontosFortes.push('Empatia profunda e habilidade de se conectar com a dor alheia');
        }
        if (textoCompleto.includes('claro') || textoCompleto.includes('objetivo') || textoCompleto.includes('direto')) {
            pontosFortes.push('Clareza de pensamento e objetividade estratégica');
        }
        if (textoCompleto.includes('persist') || textoCompleto.includes('não desist') || textoCompleto.includes('resiliênc')) {
            pontosFortes.push('Persistência e resiliência diante de adversidades');
        }
        if (textoCompleto.includes('sabedor') || textoCompleto.includes('sábio') || textoCompleto.includes('madur')) {
            pontosFortes.push('Sabedoria e maturidade espiritual desenvolvida');
        }
        if (textoCompleto.includes('coraj') || textoCompleto.includes('enfrento') || textoCompleto.includes('ousad')) {
            pontosFortes.push('Coragem para enfrentar desafios e confrontar verdades');
        }
        
        // Baseado em profundidade
        const respostasLongas = Object.values(respostas).filter(r => r.length > 200).length;
        if (respostasLongas >= 6) {
            pontosFortes.push('Capacidade de reflexão profunda e autoconhecimento desenvolvido');
        }
        
        if (respostas.implantacao2.length > 100) {
            pontosFortes.push('Habilidade de transformar dor em propósito e autoridade');
        }
        
        if (pontosFortes.length === 0) {
            pontosFortes.push('Busca genuína por propósito e sensibilidade espiritual');
        }

        // 8. GERAR PONTOS DE ATENÇÃO
        const pontosAtencao = [];
        
        if (textoCompleto.includes('sozinho') || textoCompleto.includes('sozinha') || textoCompleto.includes('tudo sozinho')) {
            pontosAtencao.push('Tendência de carregar responsabilidades sozinho - desenvolva delegação');
        }
        if (textoCompleto.includes('cansado') || textoCompleto.includes('exaust') || textoCompleto.includes('esgot')) {
            pontosAtencao.push('Sinais de cansaço detectados - priorize descanso estratégico');
        }
        if (textoCompleto.includes('medo') || textoCompleto.includes('insegur')) {
            pontosAtencao.push('Trabalhe questões de medo e insegurança que podem limitar alcance');
        }
        if (textoCompleto.includes('perfeccion') || textoCompleto.includes('perfeito')) {
            pontosAtencao.push('Cuidado com perfeccionismo paralisante');
        }
        
        pontosAtencao.push('Mantenha alinhamento entre discurso e prática');
        pontosAtencao.push('Desenvolva estruturas que permitam multiplicar seu impacto');

        // 9. GERAR PLANO DE AÇÃO
        const planoAcao = {
            dias30: [
                `Identificar 3 ambientes onde você pode começar a ${verboDominante.toLowerCase()}`,
                `Remover 2-3 distrações que roubam energia do seu chamado`,
                `Assumir ações diárias coerentes com "${declaracaoCurta}"`
            ],
            dias90: [
                `Conectar com pessoas-chave que trabalham com ${destinatarioDominante.toLowerCase()}`,
                `Iniciar projeto piloto ligado a ${verboDominante.toLowerCase()}`,
                `Estabelecer rotina de oração/reflexão sobre seu propósito`
            ],
            dias180: [
                `Criar estrutura contínua de impacto (mentoria, grupo, plataforma)`,
                `Expandir alcance para novos territórios alinhados com propósito`,
                `Formar discípulos/multiplicadores que continuem sua missão`
            ]
        };

        return {
            declaracaoCurta,
            pontosFortes,
            pontosAtencao,
            planoAcao,
            padroes: {
                verbo: verboDominante,
                destinatario: destinatarioDominante,
                condicao: condicaoDominante
            }
        };
    }

    // PREENCHER A PÁGINA
    window.onload = function() {
        const analise = analisarProposito();
        
        // Declaração central
        document.getElementById('proposito-central-texto').innerHTML = 
            `<span>${analise.declaracaoCurta}</span>`;
        
        // Pontos fortes
        const listaFortes = document.getElementById('lista-pontos-fortes');
        listaFortes.innerHTML = '';
        analise.pontosFortes.forEach(ponto => {
            const li = document.createElement('li');
            li.textContent = ponto;
            listaFortes.appendChild(li);
        });
        
        // Pontos de atenção
        const listaAtencao = document.getElementById('lista-pontos-atencao');
        listaAtencao.innerHTML = '';
        analise.pontosAtencao.forEach(ponto => {
            const li = document.createElement('li');
            li.textContent = ponto;
            listaAtencao.appendChild(li);
        });
        
        // Plano 30 dias
        const plano30 = document.getElementById('plano-30');
        analise.planoAcao.dias30.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            plano30.appendChild(li);
        });
        
        // Plano 90 dias
        const plano90 = document.getElementById('plano-90');
        analise.planoAcao.dias90.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            plano90.appendChild(li);
        });
        
        // Plano 180 dias
        const plano180 = document.getElementById('plano-180');
        analise.planoAcao.dias180.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            plano180.appendChild(li);
        });
        
        // Mapa rápido
        document.getElementById('mapa-verbo').textContent = analise.padroes.verbo;
        document.getElementById('mapa-pessoas').textContent = analise.padroes.destinatario;
        document.getElementById('mapa-condicao').textContent = analise.padroes.condicao;
    };
</script>
</body>
</html>