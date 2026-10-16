
const fm = document.getElementById("formLogin");
const em = document.getElementById("email");
const sn = document.getElementById("senha");
const msg = document.getElementById("mensagem");

fm.addEventListener("submit", function(event) {
    event.preventDefault();
    msg.textContent = "";
    if (!em.value.trim() || !sn.value) {
        msg.textContent = "Preencha todos os campos.";
        return;
    }
    if (!em.validity.valid) {
        msg.textContent = "Digite um e-mail válido.";
        em.focus();
        return;
    }
    if (sn.value.length < 6) {
        msg.textContent = "A senha deve ter pelo menos 6 caracteres.";
        sn.focus();
        return;
    }
    msg.textContent = "Formulário validado com sucesso!";
});
document.getElementById("recuperar").addEventListener("click", function() {
    msg.textContent = "A recuperação de senha estará disponível em breve.";
});
document.getElementById("cadastrar").addEventListener("click", function() {
    msg.textContent = "O cadastro estará disponível em breve.";
});
