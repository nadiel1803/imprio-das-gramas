import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import StatCard from './StatCard.js';

// Registrar o custom element
customElements.define('stat-card', StatCard);

// --- FUNÇÕES UTILITÁRIAS ---
const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatDate = (timestamp) => timestamp ? timestamp.toDate().toLocaleDateString('pt-BR') : 'Data inválida';

// --- FUNÇÕES DE RENDERIZAÇÃO DE PÁGINA ---

/**
 * Renderiza o conteúdo do Dashboard.
 * @param {HTMLElement} contentElement O elemento onde o conteúdo será renderizado.
 */
const renderDashboard = async (contentElement) => {
    contentElement.innerHTML = `
        <div class="page-header"><h2>Dashboard</h2></div>
        <div class="stats-grid">
            <stat-card id="renda-mensal" icon="payments" title="Renda Mensal" value="--"></stat-card>
            <stat-card id="pedidos-dia" icon="receipt_long" title="Pedidos no Dia" value="--"></stat-card>
            <stat-card id="total-clientes" icon="groups" title="Total de Clientes" value="--"></stat-card>
            <stat-card id="ticket-medio" icon="trending_up" title="Ticket Médio" value="--"></stat-card>
        </div>
        <div class="content-section">
            <h3 class="section-title">Pedidos Recentes</h3>
            <table class="responsive-table">
                <thead><tr><th>Cliente</th><th>Valor Total</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody id="pedidos-tbody"><tr><td colspan="4">Carregando...</td></tr></tbody>
            </table>
        </div>`;

    try {
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        const pedidos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const hoje = new Date().setHours(0, 0, 0, 0);
        let rendaMensal = 0, pedidosHoje = 0;

        pedidos.forEach(p => {
            rendaMensal += p.valorTotal;
            if (p.data && p.data.toDate().setHours(0, 0, 0, 0) === hoje) {
                pedidosHoje++;
            }
        });

        const ticketMedio = pedidos.length > 0 ? rendaMensal / pedidos.length : 0;

        contentElement.querySelector('#renda-mensal').setAttribute('value', formatCurrency(rendaMensal));
        contentElement.querySelector('#pedidos-dia').setAttribute('value', pedidosHoje);
        contentElement.querySelector('#ticket-medio').setAttribute('value', formatCurrency(ticketMedio));
        
        // Mock de clientes
        contentElement.querySelector('#total-clientes').setAttribute('value', 315);

        const tbody = contentElement.querySelector('#pedidos-tbody');
        if (pedidos.length > 0) {
            tbody.innerHTML = pedidos.slice(0, 5).map(p => `
                <tr>
                    <td>${p.cliente}</td>
                    <td>${formatCurrency(p.valorTotal)}</td>
                    <td>${p.status}</td>
                    <td class="table-actions">
                        <button title="Editar"><span class="material-symbols-outlined">edit</span></button>
                        <button title="Excluir"><span class="material-symbols-outlined">delete</span></button>
                    </td>
                </tr>`).join('');
        } else {
            tbody.innerHTML = `<tr><td colspan="4">Nenhum pedido encontrado.</td></tr>`;
        }
    } catch (error) {
        console.error("Erro ao buscar dados para o dashboard: ", error);
        contentElement.querySelector('#pedidos-tbody').innerHTML = `<tr><td colspan="4" class="error">Erro ao carregar pedidos.</td></tr>`;
    }
};

/**
 * Renderiza a página completa de Pedidos.
 * @param {HTMLElement} contentElement
 */
const renderPedidos = async (contentElement) => {
    contentElement.innerHTML = `
        <div class="page-header">
            <h2>Pedidos</h2>
            <div class="header-actions">
                 <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Novo Pedido</button>
            </div>
        </div>
        <div class="content-section">
             <table class="responsive-table">
                <thead><tr><th>Cliente</th><th>Valor</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody id="pedidos-full-tbody"><tr><td colspan="5">Carregando pedidos...</td></tr></tbody>
            </table>
        </div>`;

    try {
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        const pedidos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const tbody = contentElement.querySelector('#pedidos-full-tbody');
        if (pedidos.length > 0) {
            tbody.innerHTML = pedidos.map(p => `
                <tr>
                    <td>${p.cliente}</td>
                    <td>${formatCurrency(p.valorTotal)}</td>
                    <td>${formatDate(p.data)}</td>
                    <td>${p.status}</td>
                    <td class="table-actions">
                        <button title="Editar"><span class="material-symbols-outlined">edit</span></button>
                        <button title="Excluir"><span class="material-symbols-outlined">delete</span></button>
                    </td>
                </tr>`).join('');
        } else {
            tbody.innerHTML = `<tr><td colspan="5">Nenhum pedido encontrado.</td></tr>`;
        }
    } catch (error) {
         console.error("Erro ao buscar pedidos: ", error);
        contentElement.querySelector('#pedidos-full-tbody').innerHTML = `<tr><td colspan="5" class="error">Erro ao carregar.</td></tr>`;
    }
};

/**
 * Renderiza a página de Clientes (placeholder). 
 * @param {HTMLElement} contentElement
 */
const renderClientes = (contentElement) => {
    contentElement.innerHTML = `
        <div class="page-header">
            <h2>Clientes</h2>
            <div class="header-actions">
                 <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Novo Cliente</button>
            </div>
        </div>
        <div class="content-section">
             <table class="responsive-table">
                <thead><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Ações</th></tr></thead>
                <tbody><tr><td colspan="4">Funcionalidade em desenvolvimento.</td></tr></tbody>
            </table>
        </div>`;
}

/**
 * Renderiza a página de Catálogo (placeholder).
 * @param {HTMLElement} contentElement
 */
const renderCatalogo = (contentElement) => {
    contentElement.innerHTML = `
        <div class="page-header">
            <h2>Catálogo de Produtos</h2>
            <div class="header-actions">
                 <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Novo Produto</button>
            </div>
        </div>
        <div class="product-grid">
            ${[1,2,3,4].map(() => `
            <div class="product-card">
                <div class="product-image"><span class="material-symbols-outlined">image</span></div>
                <div class="product-info">
                    <h4>Nome do Produto</h4>
                    <p>R$ 99,99</p>
                </div>
            </div>`).join('')}
        </div>`;
}

// --- ROTEADOR E LÓGICA PRINCIPAL ---

const pages = {
    dashboard: renderDashboard,
    pedidos: renderPedidos,
    clientes: renderClientes,
    catalogo: renderCatalogo,
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
            app-content.innerHTML = '<p>Página não encontrada.</p>';
        }
        
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === page));
        if (sidebar.classList.contains('open')) sidebar.classList.remove('open');
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
