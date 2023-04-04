import { Event } from "../common/event.js";

class ModelEvents {
    winEvent = new Event();
    onTimeChanged = new Event();
    onSoundSwitched = new Event();
    onMovesCountUpdated = new Event();
    onScoreboardUpdate = new Event();
    onBoardUpdate = new Event();
    onGameStateUpdate = new Event();
    onMessageEmited = new Event();
}

export {
    ModelEvents
}