/* ============================================================
   MOTOR SYNESIS — DIAGNÓSTICO DE PROPÓSITO 2026
   Totalmente reescrito para compatibilidade 100% com o layout.
   ============================================================ */

// --- UTILITÁRIO PARA LER PARÂMETROS DA URL ---
function getQueryParams() {
    let params = {};
    window.location.search.substring(1).split("&").forEach(item => {
        let [key, value] = item.split("=");
        if (key) params[key] = parseInt(value);
    });
    return params;
}

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    const params = getQueryParams();
    processarDiagnostico(params);
});

// ============================================================
//              MAPEAMENTO DO PROPÓSITO DOMINANTE
// ============================================================

const MAPA_PROPOSITO = {
    A: {
        nome: "Construtor de Caminhos",
        descricao: "Você foi desenhado por Deus para abrir caminhos, estruturar, organizar e trazer direção. Sua presença estabelece ordem e propósito.",
        fortes: "Estratégia, clareza, visão ampla, firmeza espiritual, autoridade pacificadora.",
        fracos: "Sobrecarga, excesso de responsabilidade, dificuldade em delegar, cobrança interna elevada.",
        recomendacoes: "Pratique descanso ativo, delegue tarefas, mantenha disciplina espiritual, fortaleça conexões estratégicas."
    },
    B: {
        nome: "Curador de Pessoas",
        descricao: "Você carrega um chamado profundo para restauração emocional e espiritual. Deus te usa para acolher, curar e realinhar destinos.",
        fortes: "Empatia, escuta profunda, sensibilidade espiritual, presença acolhedora.",
        fracos: "Absorver cargas alheias, dificuldade em impor limites, desgaste emocional.",
        recomendacoes: "Fortaleça sua identidade em Cristo, pratique limites saudáveis, mantenha ambientes de descanso emocional."
    },
    C: {
        nome: "Governador de Destinos",
        descricao: "Você governa ambientes, decisões e movimentos. Deus te confiou influência e responsabilidade sobre pessoas, territórios e direções.",
        fortes: "Liderança, discernimento, firmeza, leitura de cenários, tomada de decisão.",
        fracos: "Rigor excessivo, impaciência com processos, peso da responsabilidade.",
        recomendacoes: "Trabalhe flexibilidade, fortaleça mentores espirituais, revisite direções antes de executá-las."
    },
    D: {
        nome: "Mensageiro Profético",
        descricao: "Sua vida carrega voz, revelação e instrução. Deus te usa para enxergar o que outros não veem e anunciar o que ainda não existe.",
        fortes: "Intuição espiritual, revelação, sensibilidade profética, coragem.",
        fracos: "Isolamento, rupturas desnecessárias, intensidade emocional.",
        recomendacoes: "Aproxime-se de lideranças saudáveis, ancore decisões na Palavra, mantenha ritmo de descanso."
    }
};

// ============================================================
//              FUNÇÃO PRINCIPAL DO DIAGNÓSTICO
// ============================================================

function processarDiagnostico(params) {
    if (!params || Object.keys(params).length === 0) {
        console.error("Nenhum dado recebido.");
        return;
    }

    // Soma total das respostas
    let total = Object.values(params).reduce((a, b) => a + b, 0);

    // Determina propósito dominante pela soma comparativa
    let grupos = {
        A: params.a || 0,
        B: params.b || 0,
        C: params.c || 0,
        D: params.d || 0
    };

    let dominante = Object.keys(grupos).reduce((a, b) =>
        grupos[a] > grupos[b] ? a : b
    );

    let dados = MAPA_PROPOSITO[dominante];

    preencherPagina(dados, total);
}

// ============================================================
//              PREENCHIMENTO DO HTML COM OS RESULTADOS
// ============================================================

function preencherPagina(dados, total) {

    // Preenche textos principais
    document.getElementById("resultadoTitulo").innerText = dados.nome;
    document.getElementById("resultadoDescricao").innerText = dados.descricao;

    // Pontos fortes
    document.getElementById("pontosFortes").innerText = dados.fortes;

    // Pontos fracos
    document.getElementById("pontosFracos").innerText = dados.fracos;

    // Recomendações práticas
    document.getElementById("recomendacoes").innerText = dados.recomendacoes;

    // Barra de alinhamento
    let porcentagem = Math.min(100, Math.round((total / 80) * 100));
    document.getElementById("barraProgresso").style.width = porcentagem + "%";
    document.getElementById("textoPontuacao").innerText = porcentagem + "% alinhado ao propósito";

}
