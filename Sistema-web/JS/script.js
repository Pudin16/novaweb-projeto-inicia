(() => {
    "use strict";
    const KEYS = {
        users: "nexus_users_v1",
        current: "nexus_current_user_v1",
        profile: "nexus_profile_v1"
    };

    const DEMO_ACCOUNT = {
        email: "admin@demo.com",
        password: "123456"
    };

    const $ = (selector, root = document) =>
        root.querySelector(selector);

    const $$ = (selector, root = document) =>
        [...root.querySelectorAll(selector)];

    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.error("Erro ao ler os dados:", error);
            return fallback;
        }
    }

    function saveJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
            return false;
        }
    }

    function todayISO() {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function formatDate(value) {
        if (!value) return "—";

        const parts = value.split("-");

        if (parts.length !== 3) return value;

        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    function initials(name = "Usuário") {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part[0] || "")
            .join("")
            .toUpperCase();
    }

    function escapeHTML(value = "") {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    // =====================================
    // DADOS INICIAIS
    // =====================================

    function seedUsers() {
        const existing = readJSON(KEYS.users, null);

        if (Array.isArray(existing)) {
            return existing;
        }

        const demoUsers = [
            {
                id: "u-101",
                name: "Ana Silva",
                email: "ana.silva@empresa.com",
                role: "Designer",
                status: "Ativo",
                date: "2026-01-12"
            },
            {
                id: "u-102",
                name: "Pedro Souza",
                email: "pedro.souza@empresa.com",
                role: "Desenvolvedor",
                status: "Ativo",
                date: "2026-02-03"
            },
            {
                id: "u-103",
                name: "Maria Costa",
                email: "maria.costa@empresa.com",
                role: "Analista",
                status: "Inativo",
                date: "2026-02-18"
            },
            {
                id: "u-104",
                name: "Lucas Oliveira",
                email: "lucas.oliveira@empresa.com",
                role: "Gerente de projetos",
                status: "Ativo",
                date: "2026-03-06"
            },
            {
                id: "u-105",
                name: "Camila Santos",
                email: "camila.santos@empresa.com",
                role: "Recursos Humanos",
                status: "Ativo",
                date: "2026-04-21"
            },
            {
                id: "u-106",
                name: "Rafael Lima",
                email: "rafael.lima@empresa.com",
                role: "Suporte",
                status: "Inativo",
                date: "2026-05-10"
            }
        ];

        saveJSON(KEYS.users, demoUsers);

        return demoUsers;
    }

    function getProfile() {
        return readJSON(KEYS.profile, {
            name: "Administrador",
            email: DEMO_ACCOUNT.email,
            role: "Administrador",
            phone: "",
            about: ""
        });
    }

    function currentUser() {
        return readJSON(KEYS.current, null);
    }

    // =====================================
    // MENSAGENS E INTERFACE
    // =====================================

    function showToast(message) {
        const toast = $("#toast");

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    function setMessage(element, message, type = "") {
        if (!element) return;

        element.textContent = message;
        element.className = `form-message ${type}`.trim();
    }

    function updateUserChrome() {
        const user = getProfile();

        $$("[data-user-name]").forEach(element => {
            element.textContent = user.name || "Usuário";
        });

        $$("[data-user-role]").forEach(element => {
            element.textContent = user.role || "Sem cargo";
        });

        $$("[data-user-email]").forEach(element => {
            element.textContent = user.email || "";
        });

        $$("[data-avatar]").forEach(element => {
            element.textContent = initials(user.name);
        });
    }

    // =====================================
    // SESSÃO E NAVEGAÇÃO
    // =====================================

    function requireLogin() {
        const page = document.body.dataset.page;

        if (page !== "login" && !currentUser()) {
            window.location.replace("index.html");
            return false;
        }

        return true;
    }

    function bindLogout() {
        $$("[data-logout]").forEach(button => {
            button.addEventListener("click", () => {
                localStorage.removeItem(KEYS.current);
                window.location.href = "index.html";
            });
        });
    }

    // =====================================
    // TELA DE LOGIN
    // =====================================

    function initLogin() {
        const form = $("#login-form");
        const message = $("#login-message");
        const password = $("#login-password");
        const toggle = $("#toggle-password");

        // Mostrar ou ocultar a senha.
        toggle?.addEventListener("click", () => {
            const visible = password.type === "text";

            password.type = visible ? "password" : "text";
            toggle.textContent = visible ? "Mostrar" : "Ocultar";

            toggle.setAttribute(
                "aria-label",
                visible ? "Mostrar senha" : "Ocultar senha"
            );
        });

        form?.addEventListener("submit", event => {
            event.preventDefault();

            const email = $("#login-email")
                .value
                .trim()
                .toLowerCase();

            const enteredPassword = password.value;

            if (!email || !enteredPassword) {
                setMessage(
                    message,
                    "Preencha o e-mail e a senha.",
                    "error"
                );

                return;
            }

            const savedProfile = getProfile();

            const isDemo =
                email === DEMO_ACCOUNT.email &&
                enteredPassword === DEMO_ACCOUNT.password;

            const isSavedProfile =
                email === savedProfile.email.toLowerCase() &&
                enteredPassword === "123456";

            if (!isDemo && !isSavedProfile) {
                setMessage(
                    message,
                    "Dados incorretos. Use admin@demo.com e a senha 123456.",
                    "error"
                );

                return;
            }

            saveJSON(KEYS.current, {
                email: email,
                signedInAt: new Date().toISOString()
            });

            setMessage(
                message,
                "Login realizado! Redirecionando...",
                "success"
            );

            setTimeout(() => {
                window.location.href = "consulta.html";
            }, 450);
        });
    }

    // =====================================
    // PERFIL DO USUÁRIO
    // =====================================

    function initProfile() {
        const form = $("#profile-form");

        if (!form) return;

        const fields = {
            name: $("#profile-name"),
            email: $("#profile-email"),
            role: $("#profile-role"),
            phone: $("#profile-phone"),
            about: $("#profile-about")
        };

        function fillForm() {
            const profile = getProfile();

            Object.keys(fields).forEach(key => {
                fields[key].value = profile[key] || "";
            });
        }

        fillForm();

        // O botão cancelar restaura os dados salvos.
        $("#profile-reset")?.addEventListener("click", () => {
            setTimeout(fillForm, 0);
        });

        form.addEventListener("submit", event => {
            event.preventDefault();

            const updated = {};

            Object.keys(fields).forEach(key => {
                updated[key] = fields[key].value.trim();
            });

            if (!updated.name || !updated.email) {
                setMessage(
                    $("#profile-message"),
                    "Nome e e-mail são obrigatórios.",
                    "error"
                );

                return;
            }

            const validEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updated.email);

            if (!validEmail) {
                setMessage(
                    $("#profile-message"),
                    "Informe um e-mail válido.",
                    "error"
                );

                return;
            }

            const oldEmail = getProfile().email.toLowerCase();

            if (
                updated.email.toLowerCase() !== oldEmail &&
                updated.email.toLowerCase() !== DEMO_ACCOUNT.email
            ) {
                const users = readJSON(KEYS.users, []);

                const duplicate = users.some(user =>
                    user.email.toLowerCase() ===
                    updated.email.toLowerCase()
                );

                if (duplicate) {
                    setMessage(
                        $("#profile-message"),
                        "Esse e-mail já está cadastrado na tabela.",
                        "error"
                    );

                    return;
                }
            }

            const saved = saveJSON(KEYS.profile, updated);

            if (!saved) {
                setMessage(
                    $("#profile-message"),
                    "Não foi possível salvar os dados.",
                    "error"
                );

                return;
            }

            updateUserChrome();

            setMessage(
                $("#profile-message"),
                "Perfil atualizado com sucesso.",
                "success"
            );

            showToast("Perfil salvo com sucesso!");
        });

        updateUserChrome();
    }

    // =====================================
    // CONSULTA E GERENCIAMENTO DE USUÁRIOS
    // =====================================

    function initUsers() {
        const tableBody = $("#users-table-body");

        if (!tableBody) return;

        let users = seedUsers();

        const search = $("#user-search");
        const filter = $("#status-filter");
        const modal = $("#user-modal");
        const form = $("#user-form");
        const formMessage = $("#user-form-message");
        const emptyState = $("#empty-state");

        // Atualiza os números apresentados nos cartões.
        function updateStats() {
            $("#total-users").textContent = users.length;

            $("#active-users").textContent =
                users.filter(user => user.status === "Ativo").length;

            $("#inactive-users").textContent =
                users.filter(user => user.status === "Inativo").length;
        }

        // Salva os dados no navegador.
        function persist() {
            const saved = saveJSON(KEYS.users, users);

            if (!saved) {
                showToast("Não foi possível salvar os dados.");
            }

            updateStats();
        }

        // Pesquisa, filtra e desenha a tabela.
        function render() {
            const query = search.value
                .trim()
                .toLocaleLowerCase("pt-BR");

            const selectedStatus = filter.value;

            const filtered = users.filter(user => {
                const searchable = [
                    user.name,
                    user.email,
                    user.role,
                    user.status
                ].join(" ").toLocaleLowerCase("pt-BR");

                const matchesSearch = searchable.includes(query);

                const matchesStatus =
                    selectedStatus === "todos" ||
                    user.status === selectedStatus;

                return matchesSearch && matchesStatus;
            });

            tableBody.innerHTML = filtered.map(user => `
                <tr>
                    <td>
                        <div class="table-user">
                            <div class="avatar">
                                ${escapeHTML(initials(user.name))}
                            </div>

                            <div class="table-user-info">
                                <strong>${escapeHTML(user.name)}</strong>
                                <span>${escapeHTML(user.email)}</span>
                            </div>
                        </div>
                    </td>

                    <td>${escapeHTML(user.role)}</td>

                    <td>
                        <span class="status-pill ${
                            user.status === "Ativo"
                                ? "status-active"
                                : "status-inactive"
                        }">
                            ${escapeHTML(user.status)}
                        </span>
                    </td>

                    <td>${escapeHTML(formatDate(user.date))}</td>

                    <td>
                        <div class="actions">
                            <button
                                class="action-btn"
                                type="button"
                                data-edit="${escapeHTML(user.id)}"
                                aria-label="Editar ${escapeHTML(user.name)}"
                                title="Editar"
                            >✎</button>

                            <button
                                class="action-btn delete"
                                type="button"
                                data-delete="${escapeHTML(user.id)}"
                                aria-label="Excluir ${escapeHTML(user.name)}"
                                title="Excluir"
                            >⌫</button>
                        </div>
                    </td>
                </tr>
            `).join("");

            emptyState.classList.toggle(
                "hidden",
                filtered.length > 0
            );

            tableBody.closest("table").classList.toggle(
                "hidden",
                filtered.length === 0
            );

            $("#results-count").textContent =
                `${filtered.length} ${
                    filtered.length === 1 ? "registro" : "registros"
                }`;

            $("#table-summary").textContent =
                `Mostrando ${filtered.length} de ${users.length} registros`;

            updateStats();
        }

        // Abre o formulário de cadastro ou edição.
        function openModal(user = null) {
            form.reset();

            setMessage(formMessage, "");

            $("#user-id").value = user?.id || "";

            $("#modal-title").textContent =
                user ? "Editar usuário" : "Novo usuário";

            $("#user-name").value = user?.name || "";
            $("#user-email").value = user?.email || "";
            $("#user-role").value = user?.role || "";
            $("#user-status").value = user?.status || "Ativo";
            $("#user-date").value = user?.date || todayISO();

            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";

            setTimeout(() => {
                $("#user-name").focus();
            }, 50);
        }

        // Fecha o formulário.
        function closeModal() {
            modal.classList.add("hidden");
            document.body.style.overflow = "";

            form.reset();
            setMessage(formMessage, "");
        }

        // Botão de novo usuário.
        $("#add-user-button")?.addEventListener("click", () => {
            openModal();
        });

        // Botões de fechar e cancelar.
        $$("[data-close-modal]", modal).forEach(button => {
            button.addEventListener("click", closeModal);
        });

        // Permite fechar o modal com Escape.
        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                !modal.classList.contains("hidden")
            ) {
                closeModal();
            }
        });

        // Pesquisa em tempo real.
        search.addEventListener("input", render);

        // Filtro por status.
        filter.addEventListener("change", render);

        // Limpa a pesquisa e o filtro.
        $("#clear-filters")?.addEventListener("click", () => {
            search.value = "";
            filter.value = "todos";

            render();
        });

        // Editar e excluir registros.
        tableBody.addEventListener("click", event => {
            const editButton = event.target.closest("[data-edit]");
            const deleteButton = event.target.closest("[data-delete]");

            if (editButton) {
                const user = users.find(item =>
                    item.id === editButton.dataset.edit
                );

                if (user) {
                    openModal(user);
                }
            }

            if (deleteButton) {
                const user = users.find(item =>
                    item.id === deleteButton.dataset.delete
                );

                if (!user) return;

                const confirmed = confirm(
                    `Deseja realmente excluir o usuário "${user.name}"?`
                );

                if (confirmed) {
                    users = users.filter(item => item.id !== user.id);

                    persist();
                    render();

                    showToast("Usuário excluído.");
                }
            }
        });

        // Cadastrar ou salvar alterações.
        form.addEventListener("submit", event => {
            event.preventDefault();

            const id = $("#user-id").value;

            const record = {
                id: id || `u-${Date.now()}`,
                name: $("#user-name").value.trim(),
                email: $("#user-email").value.trim(),
                role: $("#user-role").value.trim(),
                status: $("#user-status").value,
                date: $("#user-date").value
            };

            if (
                !record.name ||
                !record.email ||
                !record.role ||
                !record.date
            ) {
                setMessage(
                    formMessage,
                    "Preencha todos os campos obrigatórios.",
                    "error"
                );

                return;
            }

            const validEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email);

            if (!validEmail) {
                setMessage(
                    formMessage,
                    "Informe um e-mail válido.",
                    "error"
                );

                return;
            }

            // Impede e-mails duplicados.
            const duplicate = users.some(user =>
                user.email.toLowerCase() ===
                    record.email.toLowerCase() &&
                user.id !== id
            );

            if (duplicate) {
                setMessage(
                    formMessage,
                    "Já existe um usuário cadastrado com esse e-mail.",
                    "error"
                );

                return;
            }

            if (id) {
                users = users.map(user =>
                    user.id === id ? record : user
                );
            } else {
                users.unshift(record);
            }

            persist();
            render();
            closeModal();

            showToast(
                id
                    ? "Usuário atualizado com sucesso!"
                    : "Usuário cadastrado com sucesso!"
            );
        });

        render();
    }


    document.addEventListener("DOMContentLoaded", () => {
        if (!requireLogin()) return;

        bindLogout();
        updateUserChrome();

        const page = document.body.dataset.page;

        if (page === "login") {
            initLogin();
        }

        if (page === "perfil") {
            initProfile();
        }

        if (page === "consulta") {
            initUsers();
        }
    });

})();