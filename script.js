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

    ocorrencias.forEach(function (ocorrencia) {
      const cartao = document.createElement("article");
      cartao.classList.add("cartao");

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
      cartao.appendChild(titulo);
      cartao.appendChild(categoria);
      cartao.appendChild(perigo);
      cartao.appendChild(descricao);
      cartao.appendChild(local);
      cartao.appendChild(comunidade);
      cartao.appendChild(acesso);
      cartao.appendChild(passagem);

      lista.appendChild(cartao);
    });
  } catch (erro) {
    resumo.textContent = "Não foi possível carregar as ocorrências salvas.";
  }
}
