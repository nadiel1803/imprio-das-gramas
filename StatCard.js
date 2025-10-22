class StatCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const icon = this.getAttribute('icon') || 'bar_chart';
        const title = this.getAttribute('title') || 'Título Padrão';
        const value = this.getAttribute('value') || 'R$ 0,00';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .card {
                    background-color: #fff;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 5px 20px var(--shadow-color, rgba(0,0,0,0.08));
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px var(--shadow-color, rgba(0,0,0,0.12));
                }
                .icon-container {
                    background-color: var(--light-green, #E8F5E9);
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--primary-color, #2E7D32);
                }
                .icon-container .material-symbols-outlined {
                    font-size: 32px;
                }
                .info .title {
                    font-size: 1rem;
                    color: #666;
                    margin-bottom: 5px;
                }
                .info .value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--dark-text, #212121);
                }
            </style>
            <div class="card">
                <div class="icon-container">
                    <span class="material-symbols-outlined">${icon}</span>
                </div>
                <div class="info">
                    <div class="title">${title}</div>
                    <div class="value">${value}</div>
                </div>
            </div>
        `;
    }
}

export default StatCard;
