/* ============================================================
   MOTOR SYNESIS – Instituto Tanigawa
   Diagnóstico de Propósito • 10 Portas
   ============================================================ */

console.log("Motor Synesis carregado com sucesso.");


// ============================================================
// 1. TABELAS DE PALAVRAS-CHAVE
// ============================================================

const keywords = {
    identidade: [
        "sempre fui", "desde criança", "natureza", "essência",
        "calmo", "intenso", "protetor", "líder", "servidor",
        "estrategista", "sensível", "observador"
    ],

    dor: [
        "dor", "sofri", "quebrei", "abandono", "rejeição", "medo",
        "perdi", "trauma", "ferida", "perseguição", "humilhação"
    ],

    gigante: [
        "sempre enfrento", "luta constante", "se repete",
        "medo", "insegurança", "controle", "solidão",
        "comparação", "autossabotagem", "culpa", "vergonha"
    ],

    dom: [
        "naturalmente", "sem esforço", "excelência",
        "todos reconhecem", "habilidade", "dom", "talento",
        "organizar", "ensinar", "curar", "liderar", "restaurar",
        "discernir", "aconselhar", "estruturar", "cuidar"
    ],

    causa: [
        "indigna", "me dói", "não aceito", "me revolta",
        "não tolero", "preciso agir", "não consigo ficar parado",
        "isso me incomoda", "isso me fere"
    ],

    povo: [
        "sempre me procuram", "tenho compaixão",
        "jovens", "líderes", "pastores", "famílias",
        "pessoas quebradas", "órfãos", "empresários",
        "mulheres", "homens", "casais", "crianças"
    ],

    territorio: [
        "finanças", "cura", "governo", "ensino", "identidade",
        "transformação", "conselho", "profético", "negócios",
        "mentoria", "igreja", "família"
    ],

    voz: [
        "mensagem", "minha vida diz", "verdade central",
        "sinto que nasci para dizer", "carrego uma mensagem",
        "testemunho", "anuncio", "proclamo"
    ],

    tempo: [
        "hoje estou", "agora vivo", "fase", "temporada",
        "descoberta", "cura", "formação", "ativação",
        "expansão", "legado", "consolidação"
    ],

    missao: [
        "nasci para", "fui enviado para", "propósito",
        "minha missão", "transformar", "restaurar",
        "construir", "curar", "apontar", "guiar", "treinar"
    ]
};


// ============================================================
// 2. FUNÇÃO: ACHAR PALAVRAS-CHAVE EM UM GRUPO
// ============================================================

function detectarPalavras(texto, grupo) {
    if (!texto) return 0;

    texto = texto.toLowerCase();
    let score = 0;

    const lista = keywords[grupo] || [];
    lista.forEach(palavra => {
        if (texto.includes(palavra.toLowerCase())) {
            score++;
        }
    });

    return score;
}


// ============================================================
// 3. LEITURA EMOCIONAL (INTENSIDADE DO TEXTO)
// ============================================================

function lerEmocao(texto) {
    if (!texto) return 0;

    const tamanho = texto.length;

    if (tamanho < 60) return 1;          // superficial
    if (tamanho < 200) return 2;         // médio
    if (tamanho < 500) return 3;         // profundo
    return 4;                            // muito profundo
}


// ============================================================
// 4. CLASSIFICAÇÃO SEMÂNTICA POR DIMENSÃO
// ============================================================

function analisarPortas(respostas) {
    return {
        identidade: detectarPalavras(respostas[0], "identidade"),
        dor_transformada: detectarPalavras(respostas[1], "dor"),
        gigante: detectarPalavras(respostas[2], "gigante"),
        dom: detectarPalavras(respostas[3], "dom"),
        causa: detectarPalavras(respostas[4], "causa"),
        povo: detectarPalavras(respostas[5], "povo"),
        territorio: detectarPalavras(respostas[6], "territorio"),
        voz: detectarPalavras(respostas[7], "voz"),
        tempo: detectarPalavras(respostas[8], "tempo"),
        missao: detectarPalavras(respostas[9], "missao")
    };
}


// ============================================================
// 5. GERAR DECLARAÇÃO CENTRAL DO PROPÓSITO
// ============================================================

function primeiraFrase(texto) {
    if (!texto) return "";
    const partes = texto.split(/[\.\!\?]/);
    return partes[0].trim();
}

function gerarDeclaracao(portas, respostas) {
    const identidade = primeiraFrase(respostas[0]);
    const dor = primeiraFrase(respostas[1]);
    const dom = primeiraFrase(respostas[3]);
    const povo = primeiraFrase(respostas[5]);
    const territorio = primeiraFrase(respostas[6]);
    const missao = primeiraFrase(respostas[9]);

    let declaracaoMissao = missao;
    if (!declaracaoMissao) {
        declaracaoMissao = `manifestar o Reino de Deus servindo pessoas através da sua história`;
    }

    return (
`Você nasceu para ${declaracaoMissao.toLowerCase()}.

Sua identidade foi marcada por: ${identidade || "uma essência que Deus vem revelando ao longo do tempo"}.
A dor transformada que gerou autoridade em você é: ${dor || "uma história de processos que ainda está sendo organizada por Deus"}.

Seu dom compulsivo — aquilo que você faz sem esforço — é: ${dom || "uma capacidade natural de servir e reorganizar o ambiente ao seu redor"}.

O povo da sua missão são: ${povo || "pessoas que carregam dores semelhantes às suas, e que Deus atrai para perto de você"}.
O território onde você opera com maior impacto é: ${territorio || "os ambientes onde você é mais requisitado, ouvido e respeitado"}.

Este é um tempo de alinhamento e ativação do propósito — um chamado para parar de viver disperso e começar a viver intencionalmente naquilo que Deus escreveu sobre você.
`
    );
}


// ============================================================
// 6. GERAÇÃO DE PONTOS FORTES E PONTOS DE ATENÇÃO
// ============================================================

function gerarPontosFortes(portas) {
    const fortes = [];

    if (portas.dom > 1) {
        fortes.push("Você possui dons claros e naturais, que podem ser canalizados diretamente para o seu propósito.");
    }
    if (portas.identidade > 1) {
        fortes.push("Você tem sinais importantes de clareza sobre quem é em Deus — sua identidade está sendo consolidada.");
    }
    if (portas.dor_transformada > 1) {
        fortes.push("Suas dores não foram em vão: elas estão se tornando autoridade para cuidar e orientar outras pessoas.");
    }
    if (portas.povo > 1) {
        fortes.push("Você enxerga com nitidez um tipo de pessoa ou grupo que Deus tem colocado no seu caminho.");
    }

    if (fortes.length === 0) {
        fortes.push("Você está em uma fase importante de descoberta. O simples fato de responder este diagnóstico já é um ponto forte: disposição para clareza e alinhamento.");
    }

    return fortes;
}

function gerarPontosFracos(portas) {
    const fracos = [];

    if (portas.gigante < 1) {
        fracos.push("Seu gigante ainda não está claramente identificado. Isso pode gerar sensação de confusão e lutas repetidas sem nome.");
    }
    if (portas.tempo < 1) {
        fracos.push("Sua percepção sobre o tempo e a fase em que está não está totalmente clara. Isso pode gerar pressa ou estagnação.");
    }
    if (portas.causa < 1) {
        fracos.push("Sua indignação santa ainda não está totalmente ativada. Quando ela clarear, sua força de impacto vai aumentar muito.");
    }
    if (portas.territorio < 1) {
        fracos.push("Seu território ainda está difuso. É importante observar em quais ambientes as pessoas mais pedem sua ajuda.");
    }

    if (fracos.length === 0) {
        fracos.push("Você está em um bom nível de clareza, mas ainda precisa proteger seu coração contra distrações, comparações e ativismo sem direção.");
    }

    return fracos;
}


// ============================================================
// 7. PLANO DE AÇÃO 30 / 90 / 180 DIAS
// ============================================================

function gerarPlano() {
    return {
        dias30: [
            "Separe diariamente 10–15 minutos para declarar em voz alta quem você é em Deus e o que Ele já fez na sua história.",
            "Anote em um caderno todas as situações em que sua presença mudou o ambiente, ainda que de forma simples.",
            "Ore pedindo a Deus que revele com mais clareza seu gigante e o povo específico da sua missão."
        ],
        dias90: [
            "Comece a servir intencionalmente o povo que mais aparece na sua vida, mesmo que em pequenos gestos.",
            "Estruture uma rotina semanal onde você usa seu dom compulsivo em favor de outras pessoas.",
            "Peça feedback honesto de 3 a 5 pessoas sobre quem você é, quais dons percebem e onde você mais abençoa."
        ],
        dias180: [
            "Inicie um projeto, grupo, mentoria, célula ou movimento simples alinhado ao seu propósito.",
            "Defina limites claros para proteger seu tempo, sua energia emocional e seu foco.",
            "Construa um plano anual de propósito: o que continuar, o que parar e o que começar, à luz daquilo que Deus já te revelou."
        ]
    };
}


// ============================================================
// 8. FUNÇÃO PRINCIPAL DO MOTOR
// ============================================================

function executarMotorSynesis(respostas) {
    // Segurança mínima
    const respostasSeguras = [];
    for (let i = 0; i < 10; i++) {
        respostasSeguras[i] = respostas[i] || "";
    }

    const portas = analisarPortas(respostasSeguras);

    return {
        declaracao: gerarDeclaracao(portas, respostasSeguras),
        portas,
        fortes: gerarPontosFortes(portas),
        fracos: gerarPontosFracos(portas),
        plano: gerarPlano()
    };
}
