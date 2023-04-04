import { BoardView } from "./board-view.js";
import { UIView } from "./ui-view.js";
import { AlertsView } from "./alerts-view.js";
import { ScoreboardView } from "./scoreboard-view.js";
export { DOMGenerator } from "./dom-generation/dom-generator.js"


const viewList = [
    BoardView,
    UIView,
    ScoreboardView,
    AlertsView
]

class AppView {
    __views = [];

    constructor(model) {
        this.__model = model;
    }

    init(elements, domGenerator) {
        viewList.forEach(item => {
            let view = new item();
            this.__views.push(view);
            view.init(elements, domGenerator, this.__model);
        })
    }
}

export {
    AppView
}