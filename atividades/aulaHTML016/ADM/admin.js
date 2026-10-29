
const form = document.getElementById("formUsuario");
const tabela = document.getElementById("listaUsuarios");
const mensagem = document.getElementById("mensagem");
const botaoLimpar = document.getElementById("limpar");

let linhaSelecionada = null;

// Carrega os dados da tabela nos campos do formulário.
tabela.addEventListener("click", function(event) {
    const linha = event.target.closest("tr");

    if (!linha) {
        return;
    }

    linhaSelecionada = linha;

    document.getElementById("id").value = linha.cells[0].textContent;
    document.getElementById("nome").value = linha.cells[1].textContent;
    document.getElementById("email").value = linha.cells[2].textContent;
    document.getElementById("idade").value = linha.cells[3].textContent;

    document.querySelectorAll("#listaUsuarios tr").forEach(function(item) {
        item.classList.remove("selecionado");
    });

    linha.classList.add("selecionado");
    mensagem.textContent = "Usuário selecionado para edição.";
});

// Salva as alterações na linha selecionada.
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = document.getElementById("idade").value;

    if (!id || !linhaSelecionada) {
        mensagem.textContent = "Selecione um usuário na tabela primeiro.";
        return;
    }

    linhaSelecionada.cells[1].textContent = nome;
    linhaSelecionada.cells[2].textContent = email;
    linhaSelecionada.cells[3].textContent = idade;

    mensagem.textContent = "Dados do usuário atualizados com sucesso!";
});

// Limpa os campos para uma nova seleção.
botaoLimpar.addEventListener("click", function() {
    form.reset();

    if (linhaSelecionada) {
        linhaSelecionada.classList.remove("selecionado");
    }

    linhaSelecionada = null;
    mensagem.textContent = "Campos limpos. Selecione um usuário na tabela.";
});
