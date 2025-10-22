# Gerenciador da Loja - Blueprint do Projeto

## Visão Geral

O "Gerenciador da Loja" é uma aplicação web completa para a "Império das Gramas", projetada para gerenciar clientes, produtos e pedidos de forma eficiente. A aplicação contará com um banco de dados em nuvem (Firebase) para armazenamento de dados em tempo real, uma interface moderna e responsiva construída com componentes web nativos, e um design atraente focado na usabilidade.

## Funcionalidades Implementadas

### Estrutura e Estilo
*   **Design Moderno e Responsivo:** Layout profissional com header, barra de navegação e área de conteúdo que se adapta a desktops e dispositivos móveis.
*   **Componentização:** Uso de Web Components (`<stat-card>`) para elementos de UI reutilizáveis.

### Conectividade
*   **Firebase Configurado:** A aplicação está conectada ao Firebase. As SDKs do Firebase e Firestore foram adicionadas e o projeto foi inicializado no lado do cliente.

---

## Plano de Implementação Atual

### Passo 3: Exibição de Dados Dinâmicos do Firestore

1.  **Criar Funções de Leitura:**
    *   No `main.js`, desenvolver uma função assíncrona para buscar todos os documentos da coleção `pedidos` no Firestore.

2.  **Renderizar Dados no Dashboard:**
    *   Criar uma função `renderDashboard` que será chamada assim que os dados dos pedidos forem carregados.
    *   **Calcular Estatísticas:** Dentro de `renderDashboard`, processar os dados dos pedidos para calcular a "Renda Mensal", o "Número de Pedidos do Dia" e o "Ticket Médio".
    *   **Atualizar os Cards:** Atualizar os valores dos componentes `<stat-card>` com as estatísticas calculadas.
    *   **Preencher a Tabela:** Gerar dinamicamente as linhas da tabela "Pedidos Recentes" com os dados dos últimos pedidos recebidos.

3.  **Integração com o Roteador:**
    *   Modificar a função `navigateTo` para que, ao carregar a página `dashboard`, ela chame a nova função para buscar e renderizar os dados do Firestore, em vez de apenas exibir HTML estático.

---

## Funcionalidades Futuras

-   Implementação completa das páginas de **Pedidos, Clientes e Catálogo** com funcionalidades CRUD (Criar, Ler, Atualizar, Excluir).
-   Desenvolvimento do formulário de **Novo Pedido** com busca inteligente de clientes e produtos.
-   Autenticação de usuários para proteger o acesso ao gerenciador.
