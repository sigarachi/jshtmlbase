export class Block {
    _element = null;
    _props = null;
    _state = {};
    _container = null;

    constructor(element, props) {
        this._element = element;
        this._props = props;
        this._container = document.createElement('div');
        this._init();
    }

    async _init() {
        await this._beforeMount();
        this.update()
    }

    async _beforeMount() {
        
        await this.beforeMount(); // Даем возможность переопределить
        
    }

    beforeMount() {
        // Метод можно переопределять в дочерних классах
    }

    setState(newState) {
        this._state = { ...this._state, ...newState };
        this.update(); // Автоматический ререндер
    }

    update() {
        const newContent = this._element(this._props, this._state);
        this._container.innerHTML = newContent;
    }

    render() {
        return this._container;
    }
}