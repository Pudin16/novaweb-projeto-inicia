
const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
form.addEventListener("submit", cadastrar);
function cadastrar(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value;

    if (nome.length < 3) {
        alert("Digite seu nome completo.");
        return;
    }
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    mensagem.textContent = "Cadastrado com sucesso, " + nome + "!";
    mensagem.hidden = false;
    form.reset();
}
