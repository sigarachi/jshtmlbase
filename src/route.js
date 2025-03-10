export class Route {
    _path = ''
    _elementClass = null
    _element = null
    _props = null

    constructor(path, elementClass, props) {
        this._path = path;
        this._elementClass = elementClass;
        this._props = props;
    }

    navigate(path) {
		if (this.match(path)) {
			this.path = path;
			this.renderRoute();
		}
	}

	leave() {
		if (this._block) {
			this._block.remove();
		}
	}

	match(path) {
		return path === this._path;
	}

    renderRoute() {
        this.element = new this._elementClass(this._props)
        const app = document.getElementById('root');
	    if (app) app.appendChild(this.element.render())
    }
}