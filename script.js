const formulario = document.getElementById("form-ocorrencia");
const mensagem = document.getElementById("mensagem-formulario");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const ocorrencia = {
      categoria: formulario.categoria.value,
      perigo: formulario.perigo.value,
      descricao: formulario.descricao.value.trim(),
      municipio: formulario.municipio.value.trim(),
      estrada: formulario.estrada.value.trim(),
      referencia: formulario.referencia.value.trim(),
      comunidade: formulario.comunidade.value.trim(),
      acesso: formulario.acesso.value,
      passagem: formulario.passagem.value,
    };

    if (
      !ocorrencia.descricao ||
      !ocorrencia.municipio ||
      !ocorrencia.estrada ||
      !ocorrencia.referencia ||
      !ocorrencia.comunidade
    ) {
      mensagem.textContent =
        "Preencha os campos de texto sem usar apenas espaços.";
      return;
    }

    try {
      const ocorrencias = JSON.parse(
        localStorage.getItem("rotaAlertaOcorrencias") || "[]",
      );

      ocorrencias.push(ocorrencia);

      localStorage.setItem(
        "rotaAlertaOcorrencias",
        JSON.stringify(ocorrencias),
      );

      formulario.reset();
      mensagem.textContent = "Alerta cadastrado com sucesso!";
    } catch (erro) {
      mensagem.textContent =
        "Não foi possível salvar. Seus campos foram mantidos para tentar novamente.";
    }
  });
}
if (
  document.getElementById("lista-ocorrencias") &&
  !localStorage.getItem("rotaAlertaExemplosAdicionados")
) {
  try {
    const registros = JSON.parse(
      localStorage.getItem("rotaAlertaOcorrencias") || "[]",
    );

    const exemplos = [
      {
        categoria: "buracos",
        perigo: "alto",
        descricao: "Exemplo fictício: buracos profundos perto da ponte.",
        municipio: "Município fictício - PB",
        estrada: "Estrada da Comunidade Boa Vista",
        referencia: "Antes da ponte de madeira",
        comunidade: "Boa Vista",
        acesso: "escola",
        passagem: "parcial",
        demonstrativo: true,
      },
      {
        categoria: "alagamentos",
        perigo: "alto",
        descricao: "Exemplo fictício: água cobrindo toda a passagem.",
        municipio: "Município fictício - PB",
        estrada: "Estrada da Comunidade Lagoa Nova",
        referencia: "Próximo à entrada da comunidade",
        comunidade: "Lagoa Nova",
        acesso: "saude",
        passagem: "bloqueada",
        demonstrativo: true,
      },
    ];

    exemplos.forEach(function (exemplo) {
      registros.push(exemplo);
    });

    localStorage.setItem("rotaAlertaOcorrencias", JSON.stringify(registros));

    localStorage.setItem("rotaAlertaExemplosAdicionados", "sim");
  } catch (erro) {
    console.error("Não foi possível adicionar os exemplos.", erro);
  }
}
const lista = document.getElementById("lista-ocorrencias");
const resumo = document.getElementById("resumo-ocorrencias");

if (lista) {
  try {
    const ocorrencias = JSON.parse(
      localStorage.getItem("rotaAlertaOcorrencias") || "[]",
    );

    resumo.textContent = ocorrencias.length + " ocorrência(s) registrada(s).";

    if (ocorrencias.length === 0) {
      resumo.textContent = "Nenhuma ocorrência cadastrada ainda.";
    }

ocorrencias.forEach(function (ocorrencia, indice) {      const cartao = document.createElement("article");
      cartao.classList.add("cartao");
      cartao.dataset.categoria = ocorrencia.categoria;
      cartao.dataset.comunidade = ocorrencia.comunidade;
      cartao.dataset.acesso = ocorrencia.acesso;

      const titulo = document.createElement("h3");
      titulo.textContent = ocorrencia.estrada;

      const descricao = document.createElement("p");
      descricao.textContent = ocorrencia.descricao;

      const local = document.createElement("p");
      local.textContent =
        "Local: " +
        ocorrencia.municipio +
        " — Referência: " +
        ocorrencia.referencia;

      const comunidade = document.createElement("p");
      comunidade.textContent =
        "Comunidade com acesso prejudicado: " + ocorrencia.comunidade;

      const nomesCategorias = {
        buracos: "Buracos e asfalto danificado",
        animais: "Animais soltos na pista",
        obstaculos: "Obstáculos e passagens obstruídas",
        alagamentos: "Alagamentos e deslizamentos",
        sinalizacao: "Falta de sinalização",
      };

      const nomesPerigos = {
        baixo: "Baixo",
        moderado: "Moderado",
        alto: "Alto",
      };

      const nomesAcessos = {
        escola: "Escola",
        saude: "Unidade de saúde",
        producao: "Escoamento da produção",
        moradias: "Moradias da comunidade",
        outro: "Outro",
      };

      const nomesPassagens = {
        atencao: "Sem bloqueio, mas com risco",
        parcial: "Passagem parcialmente bloqueada",
        bloqueada: "Passagem totalmente bloqueada",
      };

      const categoria = document.createElement("p");
      categoria.textContent =
        "Categoria: " + nomesCategorias[ocorrencia.categoria];

      const perigo = document.createElement("p");
      perigo.textContent =
        "Nível de perigo: " + nomesPerigos[ocorrencia.perigo];

      const acesso = document.createElement("p");
      acesso.textContent = "Acesso afetado: " + nomesAcessos[ocorrencia.acesso];

      const passagem = document.createElement("p");
      passagem.textContent =
        "Condição da passagem: " + nomesPassagens[ocorrencia.passagem];
      if (ocorrencia.demonstrativo) {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("etiqueta-demonstracao");
        etiqueta.textContent = "Dado demonstrativo";
        cartao.appendChild(etiqueta);
      }
      cartao.appendChild(titulo);
      cartao.appendChild(categoria);
      cartao.appendChild(perigo);
      cartao.appendChild(descricao);
      cartao.appendChild(local);
      cartao.appendChild(comunidade);
      cartao.appendChild(acesso);
      cartao.appendChild(passagem);
const botaoExcluir = document.createElement("button");
botaoExcluir.type = "button";
botaoExcluir.classList.add("botao-excluir");
botaoExcluir.textContent = "Excluir ocorrência";

botaoExcluir.addEventListener("click", function () {
    const confirmou = window.confirm(
        "Deseja excluir esta ocorrência deste navegador?"
    );

    if (!confirmou) {
        return;
    }

    try {
        const registrosRestantes = ocorrencias.filter(
            function (registro, posicao) {
                return posicao !== indice;
            }
        );

        localStorage.setItem(
            "rotaAlertaOcorrencias",
            JSON.stringify(registrosRestantes)
        );

        window.location.reload();
    } catch (erro) {
        resumo.textContent = "Não foi possível excluir a ocorrência.";
    }
});

cartao.appendChild(botaoExcluir);
      lista.appendChild(cartao);
    });
  } catch (erro) {
    resumo.textContent = "Não foi possível carregar as ocorrências salvas.";
  }
}
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroComunidade = document.getElementById("filtro-comunidade");
const filtroAcesso = document.getElementById("filtro-acesso");

function normalizarTexto(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filtrarOcorrencias() {
  const cartoes = document.querySelectorAll("#lista-ocorrencias .cartao");
  const busca = normalizarTexto(filtroComunidade.value);
  let quantidade = 0;

  cartoes.forEach(function (cartao) {
    const categoriaCorreta =
      filtroCategoria.value === "" ||
      cartao.dataset.categoria === filtroCategoria.value;

    const comunidadeCorreta = normalizarTexto(
      cartao.dataset.comunidade,
    ).includes(busca);

    const acessoCorreto =
      filtroAcesso.value === "" || cartao.dataset.acesso === filtroAcesso.value;

    const mostrar = categoriaCorreta && comunidadeCorreta && acessoCorreto;

    cartao.hidden = !mostrar;

    if (mostrar) {
      quantidade++;
    }
  });

  resumo.textContent =
    quantidade === 0
      ? "Nenhuma ocorrência corresponde à consulta."
      : quantidade + " ocorrência(s) encontrada(s).";
}

if (filtroCategoria && filtroComunidade && filtroAcesso) {
  filtroCategoria.addEventListener("change", filtrarOcorrencias);
  filtroComunidade.addEventListener("input", filtrarOcorrencias);
  filtroAcesso.addEventListener("change", filtrarOcorrencias);
}
