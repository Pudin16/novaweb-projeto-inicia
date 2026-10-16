
const botoes = document.querySelectorAll("button[data-campo]");
const mensagem = document.getElementById("mensagem");
botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const id = botao.dataset.campo;
        const campo = document.getElementById(id);

        campo.disabled = false;
        campo.focus();

        mensagem.textContent = "Campo habilitado: " + id;
    });
});
document.querySelectorAll("input").forEach(function(campo) {
    campo.addEventListener("blur", function() {
        campo.disabled = true;
        mensagem.textContent = "Campo desabilitado novamente.";
    });
});
