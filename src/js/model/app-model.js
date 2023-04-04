import { AudioPlayer } from './audio-player.js';
import { DataLoader } from './data-loader.js';
import { Timer } from './timer.js';

const { ModelEvents } = require('./events.js');
const { GameModel } = require('./game/game-model.js');
const { Scoreboard } = require('./scoreboard-model.js');

class AppModel extends ModelEvents  {

    isLoaded = false;

    // Modules
    game = new GameModel();
    scoreboard = new Scoreboard();
    audio = new AudioPlayer();
    timer = new Timer();
    loader = new DataLoader();

    constructor() {
        super();

        // Events subscribtion
        this.game.winEvent.addEventListener(() => this.winEventHandler());
        this.timer.timeChangedEvent.addEventListener(
            (minutes, seconds) => this.timeChangedHandler(minutes, seconds)
                
        );
        this.game.boardUpdatedEvent.addEventListener(
            (board, size, possibleMoves, movesCount, madeMove) => {
                this.onBoardUpdate.invoke(board, size, possibleMoves, movesCount, madeMove);
            }
        );

        this.game.gameStateChanged.addEventListener(
            (state) => {
                this.onGameStateUpdate.invoke(state);
                if (this.isLoaded && !this.game.isStarted()) {
                    this.saveGame();
                }
            }
        )

        this.scoreboard.scoreboardUpdateEvent.addEventListener(
            (scoreboard) => {
                this.onScoreboardUpdate.invoke(scoreboard)
            }
        )
    }

    init() {
        this.loader.init();
        this.audio.init(this.loader.getProperty('sound'));
        this.game.init();
        this.timer.init();
        this.scoreboard.init();
        this.onSoundSwitched.invoke(this.audio.isEnabled());

        this.isLoaded = true;
        this.load();
    }

    load() {
        let scoreboard = this.loader.getProperty('scoreboard');
        let game = this.loader.getProperty('game');
        if (game !== undefined) {
            this.game.loadGame(game.board, game.moves);
            this.timer.start(game.seconds);
        }
        if (scoreboard !== undefined) {
            this.scoreboard.loadScoreboard(scoreboard, this.game.getSize());
        }
    }

    saveGame() {
        if (!this.isLoaded) return;
        if (this.game.isStarted()) {
            this.loader.setProperty('game', {...this.game.getSaveData(), seconds: this.timer.getFullSeconds()});
        }
        else {
            this.loader.setProperty('game');
        }
    }

    saveScoreboard() {
        this.loader.setProperty('scoreboard', this.scoreboard.getFullScoreboard());
    }
    
    timeChangedHandler(minutes, seconds) {
        this.onTimeChanged.invoke(minutes, seconds);
        this.saveGame();
    } 

    winEventHandler() {
        this.timer.stop();

        let result = {
            minutes: this.timer.getMinutes(), 
            seconds: this.timer.getSeconds(),
            moves: this.game.movesCount()
        };

        this.winEvent.invoke(result.minutes, result.seconds, result.moves);

        this.scoreboard.addNewResult(result.minutes, result.seconds, result.moves);   
        this.saveScoreboard();
    }

    makeMove(x, y) {
        try {
            this.game.makeMove(x, y);
            this.audio.playTileMove();
        }
        catch (error) {
            if (error.message === "Game isn't started!") this.onMessageEmited.invoke({
                type: 'ERROR',
                text: error
            });
            else throw error;
        }
    };

    restartGame() {
        this.game.restartGame();
        this.timer.start();
    };

    stopGame() {
        try {
            this.game.stop();
            this.timer.stop();
        }
        catch (error) {
            if (error.message === "Game isn't started!") this.onMessageEmited.invoke({
                type: 'ERROR',
                text: error
            });
            else throw error;
        }
    };

    toggleSound() {
        this.audio.toggle();
        this.loader.setProperty('sound', this.audio.isEnabled());
        this.onSoundSwitched.invoke(this.audio.isEnabled());
    };

    getSize() {
        return this.game.getSize();
    }

    changeSize(size) {
        try {
            this.game.setSize(size);
            this.scoreboard.changeSection(size);
        }
        catch (error) {
            if (error.message === "Can't change size of board, when game is started!") this.onMessageEmited.invoke({
                type: 'ERROR',
                text: error
            });
            else throw error;
        }
    };
}  

export {
    AppModel
}