export class Route {
    _pathPattern = '';
    _currentPath = '';
    _elementClass = null;
    _element = null;
    _props = {};
    _params = {};
    _lastRenderedParams = {};

    constructor(pathPattern, elementClass, props) {
        this._pathPattern = pathPattern;
        this._elementClass = elementClass;
        this._props = props;
    }

    navigate(path) {
        if (this.match(path)) {
            // Проверяем, изменились ли параметры
            const paramsChanged = !this._areParamsEqual(this._params, this._lastRenderedParams);
            
            this._currentPath = path;
            
            if (paramsChanged || !this._element) {
                this._lastRenderedParams = {...this._params};
                this.render();
            }
        }
    }

    leave() {
        if (this._element) {
            this._element.remove();
            this._element = null;
            this._lastRenderedParams = {};
        }
    }

    match(path) {
        const patternParts = this._pathPattern.split('/');
        const pathParts = path.split('/');
        
        if (patternParts.length !== pathParts.length) {
            return false;
        }
        
        const newParams = {};
        
        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const pathPart = pathParts[i];
            
            if (patternPart.startsWith(':')) {
                const paramName = patternPart.slice(1);
                newParams[paramName] = pathPart;
            } else if (patternPart !== pathPart) {
                return false;
            }
        }
        
        this._params = newParams;
        return true;
    }

    render() {
        const propsWithParams = {
            ...this._props,
            params: this._params,
            path: this._currentPath
        };
        
        this._element = new this._elementClass(propsWithParams);
        const app = document.getElementById('root');
        if (app) {
            app.innerHTML = '';
            app.appendChild(this._element.render());
        }
    }

    _areParamsEqual(params1, params2) {
        const keys1 = Object.keys(params1);
        const keys2 = Object.keys(params2);
        
        if (keys1.length !== keys2.length) {
            return false;
        }
        
        for (const key of keys1) {
            if (params1[key] !== params2[key]) {
                return false;
            }
        }
        
        return true;
    }
}