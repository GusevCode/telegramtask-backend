import { API } from '../config/api.js';

export class EventManager {
    constructor(container) {
        this.container = container;
        this.render();
        this.attachEventListeners();
    }

    render() {
        const eventManagerHTML = `
            <div class="event-manager">
                <h1>Менеджер мероприятий</h1>
                <form class="event-form" id="eventForm">
                    <div class="form-group">
                        <label for="eventName">Название мероприятия:</label>
                        <input type="text" id="eventName" name="eventName" required>
                    </div>
                    <div class="form-group">
                        <label for="eventType">Тип мероприятия:</label>
                        <select id="eventType" name="eventType" required>
                            ${Array.from({length: 20}, (_, i) => `<option value="тип${i + 1}">Тип${i + 1}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="eventDate">Дата мероприятия:</label>
                        <input type="date" id="eventDate" name="eventDate" required>
                    </div>
                    <button type="submit" class="submit-button">Добавить мероприятие</button>
                </form>
                <div class="event-list" id="eventList"></div>
            </div>
        `;
        this.container.innerHTML = eventManagerHTML;
        this.eventForm = this.container.querySelector('#eventForm');
        this.eventList = this.container.querySelector('#eventList');
    }

    attachEventListeners() {
        this.eventForm.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const eventName = this.container.querySelector('#eventName').value;
        const eventDate = this.container.querySelector('#eventDate').value;
        const eventType = this.container.querySelector('#eventType').value;
        
        this.addEvent(eventName, eventDate, eventType);
    }

    async addEvent(name, date, type) {
        const eventData = {
            name: name,
            date: date,
            type: type
        };

        try {
            await API.createEvent(eventData);
            this.eventForm.reset();
			alert("Мероприятие добавлено")
        } catch (error) {
            console.error('Ошибка при добавлении мероприятия:', error);
            alert("Ошибка при добавлении мероприятия")
        }
    }
}