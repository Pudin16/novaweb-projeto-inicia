# TechPoint

Loja virtual institucional de tecnologia, periféricos e acessórios para computadores e setups, desenvolvida como projeto acadêmico da unidade curricular **Linguagem de Marcação**, do curso Técnico em Desenvolvimento de Sistemas — SENAI "Antônio Devisate".

Projeto conduzido no contexto fictício da empresa **NovaWeb Studio**, especializada em sites para pequenos empreendedores.

## Sobre

A TechPoint é uma marca fictícia de e-commerce institucional voltada a mouses, teclados, headsets, monitores e acessórios para setups gamer, criativos e de home office. O site apresenta a marca, o catálogo de produtos e um canal de contato — sem carrinho de compras ou pagamento real, já que se trata de uma **loja institucional**, não de um e-commerce completo.

## Tecnologias

- HTML5 semântico
- CSS3 (sem frameworks — escrito manualmente)

Este projeto **não utiliza JavaScript**. Todas as interações (menu mobile, navegação por categoria e feedback do formulário) são resolvidas apenas com HTML e CSS.

## Estrutura de pastas

```text
techpoint/
│
├── index.html
├── produtos.html
├── contato.html
│
├── css/
│   └── style.css
│
├── img/
│   ├── logo/
│   │   └── logo.svg
│   └── produtos/
│       └── (ícones SVG dos produtos e categorias)
│
└── README.md
```

## Funcionalidades

- Navegação funcional entre as três páginas
- Menu mobile 100% CSS, usando a técnica de checkbox oculta (`input[type="checkbox"]` + `label` + seletor `:checked`)
- Catálogo com 12 produtos organizados em 5 categorias, com navegação rápida por âncoras (`#mouses`, `#teclados` etc.)
- Tabela comparativa de especificações
- Formulário de contato com validação nativa do HTML5 (`required`, `minlength`, `type="email"`) e mensagem de confirmação revelada apenas com CSS, via seletor `:target` (sem envio real a servidor)
- Botão "voltar ao topo" (link âncora simples)
- Layout responsivo (desktop, tablet e celular)
- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Acessibilidade básica: `lang="pt-BR"`, `alt` em imagens, `label` associado aos campos, foco visível

### Como funcionam as interações sem JavaScript

- **Menu mobile:** uma checkbox invisível (`#menu-check`) é ligada ao ícone de hambúrguer por um `<label for="menu-check">`. O CSS usa `.menu-check:checked ~ .nav-principal` para mostrar o menu quando a checkbox é marcada.
- **Navegação por categoria:** os links de "Mouses", "Teclados" etc. na página de produtos são âncoras (`href="#mouses"`) que rolam até a seção correspondente — não há filtragem dinâmica, apenas rolagem para o grupo de produtos.
- **Confirmação do formulário:** o formulário usa `action="#enviado"`. Ao enviar (depois de passar pela validação nativa do navegador), a página rola até o parágrafo com `id="enviado"`, que só fica visível por causa do seletor CSS `#enviado:target`.

## Páginas

- **index.html** — Home: hero, categorias, produtos em destaque, seção sobre, benefícios e chamada para ação.
- **produtos.html** — Catálogo completo com 12 produtos, filtro por categoria e tabela comparativa.
- **contato.html** — Formulário de contato e informações institucionais.

## Como executar

1. Abra a pasta `techpoint` no VS Code.
2. Instale a extensão **Live Server** (opcional, mas recomendado).
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**, ou simplesmente abra o arquivo `index.html` diretamente no navegador.

## GitHub

Este projeto foi desenvolvido como atividade acadêmica individual, com evolução versionada por meio de commits sequenciais no Git/GitHub, conforme exigido pela Situação de Aprendizagem 01 da unidade curricular Linguagem de Marcação.
