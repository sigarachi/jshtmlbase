import {Route} from './route.js'

export class Router {
    routes = []
    history = null

    _currentRoute = null

    __instance = null
    notFoundRoute = null

    constructor() {
        if(Router.__instance) {
            return Router.__instance
        }

        this.routes = []
        this.history = window.history

        Router.__instance = this
    }

    _onRoute(path) {
        const route = this.getRoute(path)


        if(this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }

        if(!route) {
            this.notFoundRoute.navigate('/404')
        } else {
            this._currentRoute = route;

            try {
                route.navigate(path)
            } catch(e) {
                this._currentRoute = this.notFoundRoute;
                this.notFoundRoute.navigate('/404')
            }
        }
    }

    use(path, element, context = {}) {
        const route = new Route(path, element, {context})
        this.routes.push(route)
        return this
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    getRoute(path) {
        return this.routes.find((element) => element.match(path))
    }
}

const router = new Router();

export default router