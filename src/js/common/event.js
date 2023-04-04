class Event {
    constructor() {
        this.eventListeners = [];
    }

    addEventListener(listener) {
        this.eventListeners.push(listener);
    }

    removeEventListener(listener) {
        let index = this.eventListeners.indexOf(listener);
        if (listener !== -1) this.eventListeners.splice(index, 1);
    }

    invoke() {
        for (let listener of this.eventListeners) {
            listener(...arguments);
        }
    }
}

export {
    Event
}