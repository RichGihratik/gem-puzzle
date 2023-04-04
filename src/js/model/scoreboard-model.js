const { Event } = require("../common/event");

function resultEvaluation(result1, result2) {
    let evaluateResult = (result) => {
        return (result.minutes * 60 + result.seconds) / result.movesCount;
    } 
    return evaluateResult(result1) - evaluateResult(result2);
}

class Scoreboard {
    __scoreboard = {};
    __current = 4;

    __scoreboardCount = 10;

    scoreboardUpdateEvent = new Event();

    init(current) {
        if (typeof current === "number") this.__current = current;
        this.__scoreboard[this.__current] = [];

        this.scoreboardUpdateEvent.invoke(this.getScoreboard());
    }

    getScoreboard() {
        return [...this.__scoreboard[this.__current]];
    }

    getFullScoreboard() {
        return this.__scoreboard;
    }

    changeSection(size) {
        if (typeof size !== "number") throw new Error(`Invalid argument (${size} was ${typeof size})!`);
        this.__current = size;
        if (this.__scoreboard[this.__current] === undefined) this.__scoreboard[this.__current] = [];

        this.scoreboardUpdateEvent.invoke(this.getScoreboard());
    }

    addNewResult(minutes, seconds, movesCount) {
        this.__scoreboard[this.__current].push({
            minutes: minutes,
            seconds: seconds,
            movesCount: movesCount
        });
        
        this.__scoreboard[this.__current].sort(resultEvaluation);
        while (this.__scoreboard[this.__current].length > this.__scoreboardCount) 
            this.__scoreboard[this.__current].pop();
        this.scoreboardUpdateEvent.invoke(this.getScoreboard());
        return this.getScoreboard();
    }

    loadScoreboard(scoreboard, size) {
        this.__scoreboard = scoreboard;
        if (typeof size === 'number') this.__current = size;
        this.scoreboardUpdateEvent.invoke(this.getScoreboard());
    }
}

module.exports = {
    Scoreboard
}