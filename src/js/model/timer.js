import { Event } from "../common/event.js";

class Timer {
    timeChangedEvent = new Event();

    __seconds = 0;
    __isStarted = false;
    __timeId = null;

    init() {
        this.timeChangedEvent.invoke(this.getMinutes(), this.getSeconds());
    }

    getMinutes() {
        return Math.floor(this.__seconds / 60);
    }

    getSeconds() {
        return this.__seconds % 60;
    }

    getFullSeconds() {
        return this.__seconds;
    }

    isStarted() {
        return this.__isStarted;
    }

    __addSecond() {
        if (this.__isStarted) {
            this.__seconds++;
            this.timeChangedEvent.invoke(this.getMinutes(), this.getSeconds());
        }
        else this.stop();
    }

    start(seconds) {
        if (this.__isStarted) this.stop();
        this.__isStarted = true;
        if (typeof seconds === 'number') this.__seconds = seconds;
        else this.__seconds = 0;
        this.timeChangedEvent.invoke(this.getMinutes(), this.getSeconds());
        this.__timeId = setInterval(() => this.__addSecond(), 1000);
    }

    stop() {
        this.__isStarted = false;
        clearInterval(this.__timeId);
        this.timeChangedEvent.invoke(this.getMinutes(), this.getSeconds());
    }
}

export {
    Timer
}