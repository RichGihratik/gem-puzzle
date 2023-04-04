import { ViewBase } from "./view-base.js";
import { timeFormat } from "../common/utils.js";

class AlertsView extends ViewBase {
    _subscribeToModelEvents(model) {
        model.winEvent.addEventListener(
            (minutes, seconds, moves) => this.__createAlert(minutes, seconds, moves)
        )
    }

    __createAlert(minutes, seconds, moves) {
        setTimeout(() => window.alert(`Hooray! You solved the puzzle in ${timeFormat(minutes, seconds)} and ${moves} moves!`), 450);
    }
}

export {
    AlertsView
}