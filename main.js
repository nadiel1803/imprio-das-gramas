import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import StatCard from './StatCard.js';

// Registrar o custom element
customElements.define('stat-card', StatCard);

/**
 * Formata um número como moeda brasileira.
 * @param {number} value O número a ser formatado.
 * @returns {string}
 */
const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

/**
 * Busca os dados do Firestore e renderiza o conteúdo do Dashboard.
 * @param {HTMLElement} contentElement O elemento onde o conteúdo será renderizado.
 */
const renderDashboard = async (contentElement) => {
    // 1. Define o HTML base com os placeholders de carregamento
    contentElement.innerHTML = `
        <div class="page-header">
            <h2>Dashboard</h2>
            <div class="header-actions">
                <button class="btn btn-primary">
                    <span class="material-symbols-outlined">add</span>
                    Novo Pedido
                </button>
            </div>
        </div>
        <div class="stats-grid">
            <stat-card id="renda-mensal" icon="payments" title="Renda Mensal" value="--"></stat-card>
            <stat-card id="pedidos-dia" icon="receipt_long" title="Pedidos no Dia" value="--"></stat-card>
            <stat-card id="total-clientes" icon="groups" title="Total de Clientes" value="315"></stat-card> 
            <stat-card id="ticket-medio" icon="trending_up" title="Ticket Médio" value="--"></stat-card>
        </div>
        <div class="content-section">
            <h3 class="section-title">Pedidos Recentes</h3>
            <table class="responsive-table">
                <thead>
                    <tr><th>Cliente</th><th>Valor Total</th><th>Status</th><th>Ações</th></tr>
                </thead>
                <tbody id="pedidos-tbody"> 
                    <tr><td colspan="4">Carregando pedidos...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    try {
        // 2. Busca os dados dos pedidos no Firestore
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        const pedidos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 3. Calcula as estatísticas
        const hoje = new Date().setHours(0, 0, 0, 0);
        let rendaMensal = 0;
        let pedidosHoje = 0;

        pedidos.forEach(pedido => {
            // Simplificação: considera todos os pedidos para a renda mensal
            rendaMensal += pedido.valorTotal;
            // Verifica se o pedido foi feito hoje
            if (pedido.data.toDate().setHours(0, 0, 0, 0) === hoje) {
                pedidosHoje++;
            }
        });

        const ticketMedio = pedidos.length > 0 ? rendaMensal / pedidos.length : 0;

        // 4. Atualiza os cards de estatísticas
        contentElement.querySelector('#renda-mensal').setAttribute('value', formatCurrency(rendaMensal));
        contentElement.querySelector('#pedidos-dia').setAttribute('value', pedidosHoje);
        contentElement.querySelector('#ticket-medio').setAttribute('value', formatCurrency(ticketMedio));

        // 5. Preenche a tabela de pedidos
        const tbody = contentElement.querySelector('#pedidos-tbody');
        if (pedidos.length > 0) {
            tbody.innerHTML = pedidos.slice(0, 5).map(pedido => `
                <tr>
                    <td>${pedido.cliente}</td>
                    <td>${formatCurrency(pedido.valorTotal)}</td>
                    <td>${pedido.status}</td>
                    <td class="table-actions">
                        <button title="Editar"><span class="material-symbols-outlined">edit</span></button>
                        <button title="Excluir"><span class="material-symbols-outlined">delete</span></button>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = `<tr><td colspan="4">Nenhum pedido encontrado.</td></tr>`;
        }

    } catch (error) {
        console.error("Erro ao buscar pedidos: ", error);
        const tbody = contentElement.querySelector('#pedidos-tbody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="4" style="color: red;">Erro ao carregar os pedidos. Verifique o console.</td></tr>`;
        }
    }
};

const pages = {
    dashboard: renderDashboard,
    pedidos: (el) => el.innerHTML = `<div class="page-header"><h2>Pedidos</h2></div><p>Em breve...</p>`,
    clientes: (el) => el.innerHTML = `<div class="page-header"><h2>Clientes</h2></div><p>Em breve...</p>`,
    catalogo: (el) => el.innerHTML = `<div class="page-header"><h2>Catálogo</h2></div><p>Em breve...</p>`,
    'novo-pedido': (el) => el.innerHTML = `<div class="page-header"><h2>Novo Pedido</h2></div><p>Em breve...</p>`
};

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar a');
    const appContent = document.getElementById('app-content');

    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

    const navigateTo = (page) => {
        const renderFunction = pages[page];
        if (typeof renderFunction === 'function') {
            renderFunction(appContent);
        } else {
            appContent.innerHTML = '<p>Página não encontrada.</p>';
        }
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = e.currentTarget.dataset.page;
        });
    });

    const handleNavigation = () => {
        const page = window.location.hash.substring(1) || 'dashboard';
        navigateTo(page);
    };

    window.addEventListener('hashchange', handleNavigation);
    handleNavigation();
});
