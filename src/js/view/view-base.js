class ViewBase {
    _ids = []

    init(elements, domGenerator, model) {
        this._elementsInit(elements);
        this._domGenerator = domGenerator;
        this.__appendIds(elements);
        this._subscribeToModelEvents(model);
    }

    __appendIds(elements) {
        for (let id of this._ids) {
            this[id] = elements[id];
        }
    }

    sendMessage(message) { }

    _elementsInit(elements) {};

    _subscribeToModelEvents(model) { };
}

module.exports = {
    ViewBase
}