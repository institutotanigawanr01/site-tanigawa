// =========================
// 🔥 MOTOR SYNESIS 2026 🔥
// Propósito 100% Individual
// =========================

function executarMotorSynesis(dados) {
    // -------------------------
    // 1. Pré-processamento
    // -------------------------

    const limpar = (arr) =>
        arr.filter(x => x && x.trim() !== "").map(x => x.trim());

    const valores = limpar(dados.valores || []);
    const verbos = limpar(dados.verbos || []);
    const comportamentos = limpar(dados.comportamentos || []);
    const transformacao = limpar(dados.transformacao || []);
    const legado = limpar(dados.legado || []);
    const povo = limpar(dados.povo || []);
    const esfera = limpar(dados.esfera || []);
    const territorio = limpar(dados.territorio || []);
    const estadoInterno = limpar(dados.estado_interno || []);
    const sensacao = limpar(dados.sensacao_missao || []);
    const linguagemPessoal = limpar(dados.linguagem_pessoal || []);

    // -------------------------
    // 2. Funções auxiliares
    // -------------------------

    const escolher = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const unir = (arr, sep = ", ") =>
        arr.length === 1 ? arr[0] :
        arr.length === 2 ? `${arr[0]} e ${arr[1]}` :
        arr.slice(0, -1).join(sep) + " e " + arr[arr.length - 1];

    // Variações linguísticas para evitar repetição
    const conectores = [
        "para",
        "a fim de",
        "com o propósito de",
        "com a missão de",
        "visando",
        "com o chamado de"
    ];

    const intensificadores = [
        "de forma intensa",
        "com excelência",
        "com clareza",
        "com dedicação profunda",
        "com intencionalidade",
        "de modo transformador"
    ];

    const marcadoresDestino = [
        "cumprindo o propósito para o qual fui criado",
        "vivendo o destino profético que recebi de Deus",
        "respondendo ao chamado do Céu",
        "honrando aquilo que o Senhor confiou a mim",
        "caminhando naquilo que Jesus escreveu sobre minha vida"
    ];

    // -------------------------
    // 3. Montagem do Propósito
    // -------------------------

    // (A) Eixo – Verbos + Valores
    const blocoIdentidade = [
        verbos.length ? `Nasci para ${unir(verbos)}` : "",
        valores.length ? `carregando como valores centrais ${unir(valores)}` : ""
    ].filter(Boolean).join(", ");

    // (B) Ação – Transformação
    const blocoTransformacao = transformacao.length
        ? `${escolher(conectores)} ${unir(transformacao)}`
        : "";

    // (C) Público – Povo / Esfera
    const blocoPublico = [
        povo.length ? `alcançando especialmente ${unir(povo)}` : "",
        esfera.length ? `atuando dentro de ${unir(esfera)}` : ""
    ].filter(Boolean).join(", ");

    // (D) Território
    const blocoTerritorio = territorio.length
        ? `expandindo essa missão em ${unir(territorio)}`
        : "";

    // (E) Tom emocional
    const blocoEstado = [
        estadoInterno.length ? `vivendo ${unir(estadoInterno)}` : "",
        sensacao.length ? `sentindo que estou ${unir(sensacao)}` : ""
    ].filter(Boolean).join(", ");

    // (F) Assinatura profética
    const blocoDestino = escolher(marcadoresDestino);

    // (G) Linguagem pessoal (se houver)
    const blocoLinguagemPessoal = linguagemPessoal.length
        ? `Em minhas próprias palavras: "${linguagemPessoal.join(' ')}".`
        : "";

    // -------------------------
    // 4. Construção Final
    // -------------------------

    const declaracao = [
        blocoIdentidade,
        blocoTransformacao,
        blocoPublico,
        blocoTerritorio,
        escolher(intensificadores),
        blocoEstado,
        blocoDestino,
        blocoLinguagemPessoal
    ]
        .filter(Boolean)
        .join(". ")
        .replace(/\.\s*\./g, ".")
        .trim();

    // -------------------------
    // 5. Relatório complementar
    // -------------------------

    const pontosFortes = [
        ...valores,
        ...verbos,
        ...comportamentos
    ];

    const pontosAtencao = [
        "Manter alinhamento entre velocidade e profundidade",
        "Evitar assumir responsabilidades que não são suas",
        "Praticar descanso estratégico para sustentar o chamado",
        "Desenvolver estruturas que permitam escalar sua missão"
    ];

    const plano = {
        "30_dias": [
            "Identificar ambientes imediatos onde seu propósito já pode ser praticado.",
            "Remover distrações que roubam energia do seu chamado.",
            "Assumir pequenas ações diárias coerentes com seus verbos dominantes."
        ],
        "90_dias": [
            "Mapear relacionamentos estratégicos para sua missão.",
            "Iniciar um projeto piloto diretamente ligado ao seu propósito.",
            "Estabelecer hábitos que reforcem seus valores centrais."
        ],
        "180_dias": [
            "Criar uma estrutura contínua de impacto conforme sua esfera de influência.",
            "Expandir seu alcance para novos territórios (digitais ou físicos).",
            "Ajustar seu ritmo interno para sustentar sua missão ao longo dos anos."
        ]
    };

    // -------------------------
    // 6. Retorno Final
    // -------------------------

    return {
        declaracao,
        fortes: pontosFortes,
        fracos: pontosAtencao,
        plano
    };
}
