import { API } from '../config/api.js';

export class ClientList {
    constructor(container) {
        this.container = container;
        this.clients = [];
        this.render();
        this.fetchClients();
    }

    render() {
        const clientListHTML = `
            <div class="client-list">
                <h1 class="client-list__title">Список клиентов</h1>
                <table class="client-list__table" id="clientTable">
                    <thead class="client-list__table-head">
                        <tr>
                            <th class="client-list__table-header">ФИО</th>
                            <th class="client-list__table-header">Дата</th>
                            <th class="client-list__table-header">Действия</th>
                        </tr>
                    </thead>
                    <tbody class="client-list__table-body" id="clientTableBody"></tbody>
                </table>
                <div class="client-list__details" id="clientDetails"></div>
            </div>
        `;
        this.container.innerHTML = clientListHTML;
        this.clientTableBody = this.container.querySelector('#clientTableBody');
        this.clientDetails = this.container.querySelector('#clientDetails');
    }

    async fetchClients() {
        try {
            const data = await API.getClients();
            if (data.status === 'OK') {
                this.clients = data.data;
                this.displayClients();
            }
        } catch (error) {
            console.error('Ошибка при получении данных клиентов:', error);
        }
    }

    displayClients() {
        this.clientTableBody.innerHTML = '';
        this.clients.forEach((client, index) => {
            const row = document.createElement('tr');
            row.classList.add('client-list__table-row');
            row.classList.add(index % 2 === 0 ? 'client-list__table-row--even' : 'client-list__table-row--odd');
            row.innerHTML = `
                <td class="client-list__table-cell">${client.fullname}</td>
                <td class="client-list__table-cell">${client.year}.${client.month}.${client.day}</td>
                <td class="client-list__table-cell">
                    <button class="delete-client" data-client-id="${client.id}">Удалить</button>
                </td>
            `;
            row.addEventListener('click', () => this.showClientDetails(client));
            this.clientTableBody.appendChild(row);
        });

        this.clientTableBody.querySelectorAll('.delete-client').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const clientId = button.dataset.clientId;
                this.deleteClient(clientId);
            });
        });
    }

    showClientDetails(client) {
        this.clientDetails.innerHTML = `
            <h2 class="client-list__details-title">Детали клиента</h2>
            <p><strong>ID:</strong> ${client.id}</p>
            <p><strong>ФИО:</strong> ${client.fullname}</p>
            <p><strong>Дата:</strong> ${client.year}.${client.month}.${client.day}</p>
        `;
        this.clientDetails.classList.add('client-list__details--active');
        
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    async deleteClient(clientId) {
        try {
            await API.deleteClient(clientId);
            this.clients = this.clients.filter(client => client.id !== clientId);
            this.displayClients();
            this.clientDetails.innerHTML = '';
            this.clientDetails.classList.remove('client-list__details--active');
        } catch (error) {
            console.error('Ошибка при удалении клиента:', error);
        }
    }
}
