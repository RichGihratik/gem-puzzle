class DOMGrid {
    tiles = {}
    gridCreated = false;
    size = 4;

    init(element, domGenerator) {
        this.__element = element;
        this.__dom = domGenerator;
    }

    createGrid(board, size, possibleMoves, madeMove) {
        let movableTiles = [];
        if (size !== this.size || !this.gridCreated) {
            let tiles = generateGridAndGetTiles(this.__element, board, size, possibleMoves);
            this.tiles = tiles.all;
            movableTiles = tiles.movable;
            this.gridCreated = true;
            this.size = size;
        }
        else {
            let offsetX = this.__element.offsetWidth;
            let offsetY = this.__element.offsetHeight;
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) { 
                    let gridItem = this.tiles[board[y][x]];
                    if (madeMove) gridItem.classList.add('animated-tile');
                    else gridItem.classList.remove('animated-tile');
                    gridItem.classList.replace("border-dark", "border-secondary");

                    gridItem.style.top = `${this.__element.offsetTop + Math.floor(offsetY / size) * y}px`;
                    gridItem.style.left = `${this.__element.offsetLeft + Math.floor(offsetX / size) * x}px`;
                    gridItem.style.width = `${Math.floor(offsetX / size)}px`;
                    gridItem.style.height = `${Math.floor(offsetY / size)}px`;
                    gridItem.coords = { x: x, y: y };

                    for (let coords of possibleMoves) {
                        if (x == coords.x && y === coords.y) {
                            gridItem.classList.replace("border-secondary", "border-dark");
                            
                            movableTiles.push(gridItem);
                            break;
                        }
                    }
                } 
            }
        }

        this.__dom.setMovableTiles(movableTiles);
    }

    resizeTiles() {
        let xLength = Math.floor(this.__element.offsetWidth / this.size);
        let yLength = Math.floor(this.__element.offsetHeight / this.size);
        for (let key in this.tiles) {
            let tile = this.tiles[key];
            tile.classList.remove('animated-tile');
            tile.style.left = `${this.__element.offsetLeft + xLength * tile.coords.x}px`;
            tile.style.top = `${this.__element.offsetTop + yLength * tile.coords.y}px`;
            tile.style.width = `${xLength}px`;
            tile.style.height = `${yLength}px`;

        }
    }
}

function generateGridAndGetTiles(element, board, size, possibleMoves) {
    element.innerHTML = "";

    let movableTiles = [];

    let tiles = {
        all: {},
        movable: movableTiles
    }

    let offsetX = element.offsetWidth;
    let offsetY = element.offsetHeight;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let gridItem = document.createElement("div");
            gridItem.classList.remove('animated-tile');
            gridItem.classList.add('position-absolute', 'user-select-none');
            gridItem.style.top = `${element.offsetTop + Math.floor(offsetY / size) * y}px`;
            gridItem.style.left = `${element.offsetLeft + Math.floor(offsetX / size) * x}px`;
            gridItem.style.width = `${Math.floor(offsetX / size)}px`;
            gridItem.style.height = `${Math.floor(offsetY / size)}px`;
            gridItem.coords = {x:x, y:y};

            let value = board[y][x];
            if (value !== null) {
                let getElementType = (size) => {
                    if (size < 4) return 'h1';
                    else if (size < 6) return 'h2';
                    else if (size === 6) return 'h4';
                    else return 'span';
                }
                let num = document.createElement(getElementType(size));
                num.innerText = String(value);
                gridItem.appendChild(num);

                gridItem.classList.add("border", "border-3", "rounded-2", "gametile");
                
                let colored = false;
                for (let coords of possibleMoves) {
                    if (x == coords.x && y === coords.y) {
                        gridItem.classList.add("border-dark");
                        colored = true;
                        movableTiles.push(gridItem);
                        break;
                    }
                }
                if (!colored) gridItem.classList.add("border-secondary");
            }
            element.appendChild(gridItem);
            tiles.all[String(value)] = gridItem;
        }
    }
    return tiles;
}

export {
    generateGridAndGetTiles,
    DOMGrid
}