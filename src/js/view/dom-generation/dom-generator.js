const { mainHtml } = require("../../../html/main.js");

const { generateDom } = require("./dom-utils.js");

const { generateGridAndGetTiles } = require("./dom-grid.js");


class DOMGenerator {
    constructor(appView, appController) {
        this.__view = appView;
        this.__controller = appController;
    }

    initDom() {
        let elements = generateDom(document.body, mainHtml);
        this.__view.init({...elements}, this);
        this.__controller.init({...elements});
    }
    
    setMovableTiles(tiles) {
        if (this.__view.setMovableTiles !== undefined) this.__view.setMovableTiles([...tiles]);
        if (this.__controller.setMovableTiles !== undefined) this.__controller.setMovableTiles([...tiles]);
    }
} 


export {
    DOMGenerator
}
