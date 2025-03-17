export class Route {
    _path = ''
    _elementClass = null
    _element = null
    _props = {}

    constructor(path, elementClass, props) {
        this._path = path
        this._elementClass = elementClass
        this._props = props
    }

    navigate(path) {
        if(this.match(path)) {
            this._path = path;
            this.render();
        }
    }

    leave() {
        if(this._element) {
            this._element.remove();
        }
    }

    match(path) {
        return path === this._path;
    }

    render() {
        this._element = new this._elementClass(this._props)
        const app = document.getElementById('root')
        if(app) app.appendChild(this._element.render())
    }
}