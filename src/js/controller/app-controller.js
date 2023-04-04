import { ButtonController } from "./buttons-controller";
import { GridController } from "./board-controller";

const controllerList = [
    GridController,
    ButtonController
]

class AppController {
    __controllers = [];

    constructor(model) {
        this.__model = model;
    }

    init(elements) {
        controllerList.forEach(item => {
            let controller = new item();
            this.__controllers.push(controller);
            controller.init(elements, this.__model);
        })
    }

    sendMessage(message) {
        for (let controller of this.__controllers) {
            controller.receiveMessage(message);
        }
    }

    setMovableTiles(movableTiles) {
        this.sendMessage({
            type: "MOVABLE-TILES",
            tiles: movableTiles
        });
    }
}

export {
    AppController
}