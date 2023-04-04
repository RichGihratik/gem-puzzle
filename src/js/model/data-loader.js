const saveLocation = 'gemPuzzle'

class DataLoader {
    __loadedData = {};

    init() {
        this.loadData();
    }

    loadData() {
        let item = window.localStorage.getItem(saveLocation);
        if (item !== null) {
            this.__loadedData = JSON.parse(item);
        }
    }

    saveData() {
        window.localStorage.setItem(saveLocation, JSON.stringify(this.__loadedData));
    }

    getProperty(name) {
        return this.__loadedData[name];
    }

    setProperty(name, value) {
        this.__loadedData[name] = value;
        this.saveData()
    }
}

export {
    DataLoader
}