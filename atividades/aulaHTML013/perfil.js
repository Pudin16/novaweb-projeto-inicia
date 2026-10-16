
const fm = document.getElementById("formPerfil");
const sb = document.getElementById("sobre");
const ct = document.getElementById("contador");
const msg = document.getElementById("mensagem");

sb.addEventListener("input", function() {
    ct.textContent = sb.value.length + "/300 caracteres";
});
fm.addEventListener("submit", function(event) {
    event.preventDefault();
    const nm = document.getElementById("nome").value.trim();
    const em = document.getElementById("email");
    const fn = document.getElementById("funcao").value;
    const nv = document.querySelector('input[name="nivel"]:checked');
    const ar = document.querySelectorAll('input[name="interesse"]:checked');

    msg.style.color = "#c0392b";

    if (nm.length < 3) {
        msg.textContent = "Digite seu nome completo.";
        return;
    }
    if (!em.validity.valid) {
        msg.textContent = "Digite um e-mail válido.";
        em.focus();
        return;
    }
    if (fn === "") {
        msg.textContent = "Selecione sua função no projeto.";
        return;
    }
    if (!nv) {
        msg.textContent = "Selecione seu nível de experiência.";
        return;
    }
    if (ar.length === 0) {
        msg.textContent = "Selecione uma área de interesse.";
        return;
    }
    if (sb.value.trim().length < 10) {
        msg.textContent = "Escreva pelo menos 10 caracteres sobre você.";
        sb.focus();
        return;
    }
    msg.style.color = "green";
    msg.textContent = "Perfil validado com sucesso!";
});
fm.addEventListener("reset", function() {
    msg.textContent = "";
    setTimeout(function() {
        ct.textContent = sb.value.length + "/300 caracteres";
    }, 0);
});
