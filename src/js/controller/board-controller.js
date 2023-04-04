import { ControllerBase } from "./controller-base";


class GridController extends ControllerBase {
    _ids = [
        'gameboard'
    ];

    __dragged = false;

    __old_tiles = [];

    __fixGrid() {
        let size = this.__model.getSize();
        if (size < 5) document.querySelectorAll("div.gametile").forEach((element) => {
            element.style.minWidth = `${this.gameboard.offsetWidth / size - 2}px`;
        });
    }

    _modelInit(model) {
        this.gameboard.style.height = `${this.gameboard.offsetWidth}px`;
        window.addEventListener('resize', () => {
            this.gameboard.style.height = `${this.gameboard.offsetWidth}px`;
            this.__fixGrid();
        });
        this.__assignMouseUpDocument();
    }

    __removeTiles() {
        for (let i = 0; i < this.__old_tiles.length; i++) {
            this.__old_tiles[i].removeEventListener('mousedown', this.__old_tiles[i].__mouseDownListener);
            this.__old_tiles[i].__mouseDownListener = undefined;

            this.__old_tiles[i].removeEventListener('mouseup', this.__old_tiles[i].__mouseUpListener);
            this.__old_tiles[i].__mouseUpListener = undefined;
        }

        this.__old_tiles = [];
    }

    __findTileBorders(tileCoords) {
        return {
            insideX: (value) => {
                let length = Math.floor(this.gameboard.offsetWidth / this.__model.game.getSize());
                let first = this.gameboard.offsetLeft + tileCoords.x * length;
                let second = first + length;
                return value >= first && value <= second; 
            },
            insideY: (value) => {
                let length = Math.floor(this.gameboard.offsetHeight / this.__model.game.getSize());
                let first = this.gameboard.offsetTop + tileCoords.y * length;
                let second = first + length;
                return value >= first && value <= second; 
            }
        }
    }

    __assignMouseUpDocument() {
        let listener = function (event) {
            if (!this.model.game.isStarted()) return;
            let makeMove = () => {
                try {
                    this.model.makeMove(
                        document.body.draggedElement.coords.x, 
                        document.body.draggedElement.coords.y
                    );
                }
                catch (error) {
                    if (!error === 'Game needs to be started') throw error;
                }
            }

            if (document.body.draggedElement !== undefined) {
                let tileBorders = this.findTileBorders();

                if (
                    tileBorders.insideX(document.body.__dragCoord.x) && 
                    tileBorders.insideY(document.body.__dragCoord.y)
                ) makeMove();
                else {
                    this.model.game.updateBoard();
                }
                event.stopPropagation();
            }

            document.body.removeEventListener('mousemove', document.body.__mouseMoveListener);
            document.body.__mouseMoveListener = undefined;
        }

        let bindObj = {
            findTileBorders: () => this.__findTileBorders(this.__model.game.getZeroCell()),
            model: this.__model
        }

        listener = listener.bind(bindObj);

        document.body.__mouseUpListener = listener;
        document.body.addEventListener('mouseup', listener);
        document.body.draggedElement = undefined;
    }

    __assignMouseUp(element) {
        let listener = function (event) {
            if (!this.model.game.isStarted()) return;
            let makeMove = () => {
                try {
                    this.model.makeMove(this.coords.x, this.coords.y);
                }
                catch (error) {
                    if (!error === 'Game needs to be started') throw error;
                }
            }

            if (document.body.draggedElement === undefined) {
                makeMove();
                document.body.prevented = true;
            }
        }

        let bindObj = {
            model: this.__model,
            coords: element.coords,
        }

        listener = listener.bind(bindObj);
        
        element.__mouseUpListener = listener;
        element.addEventListener('mouseup', listener);
    }

    __assignMouseDown(element) {
        let listener = function (event) {
            if (!this.model.game.isStarted()) return;
            // Save mouse positions
            let mouse = {
                x: event.pageX,
                y: event.pageY
            }

            let props = this.zeroCoords.x !== this.element.coords.x ? 
                { 
                    axis: 'x',
                    elementPos: 'left',
                    boardLength: 'offsetWidth',
                    boardPos: 'offsetLeft'
                } : 
                {
                    axis: 'y',
                    elementPos: 'top',
                    boardLength: 'offsetHeight',
                    boardPos: 'offsetTop'
                };

            let coords = this.element.coords;

            let board = this.board;
            let length = Math.floor(board[props.boardLength] / this.size);

            let diff = mouse[props.axis] - (board[props.boardPos] + coords[props.axis] * length);

            let motionLimits = [
                mouse[props.axis],
                board[props.boardPos] + this.zeroCoords[props.axis] * length + diff,
            ].sort();

            let mouseMove = function (event) {
                event.preventDefault();
                let motion = event['page' + props.axis.toUpperCase()];
                if (motion < motionLimits[0]) motion = motionLimits[0];
                else if (motion > motionLimits[1]) motion = motionLimits[1];
                this.element.style[props.elementPos] = `${motion - diff}px`; 

                document.body.__dragCoord = {
                    x: mouse.x,
                    y: mouse.y
                }
                document.body.__dragCoord[props.axis] = motion;
            }

            mouseMove = mouseMove.bind({element: this.element});

            document.body.draggedElement = undefined;
            document.body.prevented = false;
            setTimeout(() => {
                if (!document.body.prevented) {
                    this.element.classList.remove('animated-tile');
                    document.body.__mouseMoveListener = mouseMove;
                    document.body.addEventListener('mousemove', mouseMove);
                    document.body.draggedElement = this.element;
                }
            }, 100);
        }

        let bindObj = {
            size: this.__model.getSize(),
            board: this.gameboard,
            element: element,
            zeroCoords: this.__model.game.getZeroCell(),
            model: this.__model
        }

        listener = listener.bind(bindObj);
        element.__mouseDownListener = listener;
        element.addEventListener('mousedown', listener);
    }

    receiveMessage(message) {
        if (message !== undefined && message.type === "MOVABLE-TILES") {
            this.__fixGrid();

            this.__removeTiles();

            this.__old_tiles = message.tiles;

            for (let item of this.__old_tiles) {
                this.__assignMouseDown(item);
                this.__assignMouseUp(item);
            }
        }
    }
}

export {
    GridController
}