import { ViewBase } from "./view-base.js";
import { generateScoreboard } from "./dom-generation/dom-scoreboard.js";

class ScoreboardView extends ViewBase {
    _ids = [
        'scoreboard'
    ]

    _subscribeToModelEvents(model) {
        model.onScoreboardUpdate.addEventListener(
            (scoreboard) => this.__scoreboardGeneration(scoreboard)
        );
    }

    __scoreboardGeneration(scoreboard) {
        generateScoreboard(this.scoreboard, scoreboard);
    }
}

export {
    ScoreboardView
}