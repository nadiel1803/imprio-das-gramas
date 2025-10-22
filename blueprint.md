# Gerenciador da Loja - Blueprint do Projeto

## Visão Geral

O "Gerenciador da Loja" é uma aplicação web completa para a "Império das Gramas", projetada para gerenciar clientes, produtos e pedidos de forma eficiente. A aplicação contará com um banco de dados em nuvem (Firebase) para armazenamento de dados em tempo real, uma interface moderna e responsiva construída com componentes web nativos, e um design atraente focado na usabilidade.

## Funcionalidades Implementadas

*   **Estrutura e Estilo:** Design moderno e responsivo com componentes reutilizáveis.
*   **Conectividade com Firebase:** A aplicação está conectada ao Firestore.
*   **Dashboard Dinâmico:** O dashboard exibe estatísticas e uma lista de pedidos recentes com dados reais do Firestore.

---

## Plano de Implementação Atual

### Passo 4: Desenvolvimento das Páginas Principais

1.  **Substituir Logo por Ícone:**
    *   Trocar o logo genérico no cabeçalho por um ícone de `grass` (grama) do Material Icons, para reforçar a identidade visual da marca.

2.  **Desenvolver a Página de Pedidos:**
    *   Transformar a seção de "Pedidos" em uma página funcional.
    *   Criar uma função que busca **todos** os documentos da coleção `pedidos` no Firestore.
    *   Exibir os pedidos em uma tabela completa com detalhes como Cliente, Valor, Status e Data.

3.  **Estruturar a Página de Clientes:**
    *   Criar um layout de placeholder avançado para a página de "Clientes", com uma tabela estruturada e um botão para adicionar novos clientes, preparando o terreno para a implementação do CRUD.

4.  **Estruturar a Página de Catálogo:**
    *   Desenvolver um layout de placeholder visual para a página "Catálogo", utilizando um grid de cards para representar os produtos, preparando para a futura exibição dos itens do Firestore.

---

## Funcionalidades Futuras

-   Implementação completa das funcionalidades CRUD (Criar, Ler, Atualizar, Excluir) para Clientes e Catálogo.
-   Desenvolvimento do formulário de **Novo Pedido** com busca inteligente de clientes e produtos.
-   Autenticação de usuários para proteger o acesso ao gerenciador.
