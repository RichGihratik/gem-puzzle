import { singleNumTimeFormat } from "../common/utils.js";
import { ViewBase } from "./view-base.js";


const resizeButtonIdTemplate = /^resizeButton[1-9]x[1-9]$/;

class UIView extends ViewBase {
    _ids = [
        'minutes',
        'seconds',
        'soundState',
        'soundButton',
        'movesCount',
        'stopButton'
    ];

    _elementsInit(elements) { 
        this.__resizeButtons = {};

        // Get all buttons
        for (let key in elements) {
            let obj = elements[key];
            if (resizeButtonIdTemplate.test(key)) this.__resizeButtons[key.match(/[0-9]/)] = obj;
        }
    }

    _subscribeToModelEvents(model) { 
        model.onBoardUpdate.addEventListener(
            (board, size, possibleMoves, movesCount) => {
                this.__changeResizeButtons(size);
                this.__changeMovesCounter(movesCount);
            }
        )

        model.onTimeChanged.addEventListener(
            (minutes, seconds) => this.__changeTime(minutes, seconds)
        )

        model.onGameStateUpdate.addEventListener(
            (state) => this.__changeStopButton(state)
        )

        model.onSoundSwitched.addEventListener(
            (state) => this.__switchSound(state)
        )
    }

    __changeStopButton(state) {
        this.stopButton.disabled = !state;
    }

    __changeResizeButtons(size) {
        for (let key in this.__resizeButtons) {
            let btn = this.__resizeButtons[key];
            btn.disabled = false;
            btn.classList.replace("btn-dark", "btn-outline-dark");
        }

        this.__resizeButtons[size].classList.replace("btn-outline-dark", "btn-dark");
        this.__resizeButtons[size].disabled = true;
    }

    __switchSound(state) {
        if (state) {
            this.soundButton.classList.replace('btn-danger', 'btn-success');
            this.soundState.innerText = 'on';
        } 
        else {
            this.soundButton.classList.replace('btn-success', 'btn-danger');
            this.soundState.innerText = 'off';
        } 
    }

    __changeMovesCounter(count) {
        this.movesCount.innerText = `${count}`; 
    }

    __changeTime(minutes, seconds) {
        this.minutes.innerText = singleNumTimeFormat(minutes);
        this.seconds.innerText = singleNumTimeFormat(seconds);
    }
}

export {
    UIView
}