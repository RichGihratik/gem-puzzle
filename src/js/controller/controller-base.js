class ControllerBase {
    _ids = []

    init(elements, model) {
        this.__model = model;
        this._elementsInit(elements);
        this.__appendIds(elements);
        this._modelInit(model);
    }

    receiveMessage(message) {}

    __appendIds(elements) {
        for (let id of this._ids) {
            this[id] = elements[id];
        }
    }

    _elementsInit(elements) { };

    _modelInit(model) { };
}

export {
    ControllerBase
}