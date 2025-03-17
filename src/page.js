export class Page {
    _element = null;
    _props = null;
    _container = null;
    _state = null;

    constructor(element, props) {
        this._element = element;
        this._props = props;
        this._container = document.createElement('div')
        this._init();
    }

    async _init() {
        await this._beforeMount();
        this.update();
    }

    async _beforeMount() {
        await this.beforeMount();
    }

    update() {
        const content = this._element(this._props, this._state);
        this._container.innerHTML = content
    }

    setState(newState) {
        this._state = { ...this._state, ...newState }
        this.update()
    }

    beforeMount() {}

    render() {
       
        return this._container
    }
}
