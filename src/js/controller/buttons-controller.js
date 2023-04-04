import { ControllerBase } from "./controller-base";

const resizeButtonIdTemplate = /^resizeButton[1-9]x[1-9]$/;

class ButtonController extends ControllerBase {
    _ids = [
        'startButton',
        'stopButton',
        'soundButton'
    ];

    _elementsInit(elements) {
        this.__resizeButtons = {};

        for (let key in elements) {
            let obj = elements[key];
            if (resizeButtonIdTemplate.test(key)) this.__resizeButtons[key.match(/[0-9]/)] = obj;
        }
    }

    _modelInit(model) {
        for (let key in this.__resizeButtons) {
            let btn = this.__resizeButtons[key];
            btn.addEventListener('click', () => {
                this.__model.changeSize(+key);
            });
        }

        this.startButton.addEventListener('click', () => {
            this.__model.restartGame();
        });

        this.stopButton.addEventListener('click', () => {
            this.__model.stopGame();
        });

        this.soundButton.addEventListener('click', () => {
            this.__model.toggleSound();
        });
    }

}

export {
    ButtonController
}