import tileMoveSound from '../../assets/tile-move.mp3';

class AudioPlayer {
    __soundEnabled = false;

    isEnabled() {
        return this.__soundEnabled;
    }

    toggle() {
        this.__soundEnabled = !this.__soundEnabled;
    }

    init(sound) {
        if (typeof sound === 'boolean') this.__soundEnabled = sound;
        this.__tileMoveSound = new Audio(tileMoveSound);
    }

    playTileMove() {
        if (this.__soundEnabled) {
            this.__tileMoveSound.load();
            this.__tileMoveSound.volume = 0.4;
            this.__tileMoveSound.currentTime = 0.125;
            this.__tileMoveSound.play();
        }
    }
}

export {
    AudioPlayer
}