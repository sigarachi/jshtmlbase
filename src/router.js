import { Route } from './route.js'

export class Router {
    routes = []
    history = null

    _currentRoute = null
    _rootQuery = ''

    static __instance = null
    notFoundRoute = null

    constructor() {
        if(Router.__instance) {
            return Router.__instance
        }

        this.routes = []
        this.history = window.history

        this._currentRoute = null

        Router.__instance = this
    }
    

    _onRoute(pathname) {
		const route = this.getRoute(pathname);


		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		if (!route) {
			this.notFoundRoute?.navigate(`/${routes.notFound}`);
		} else {
			this._currentRoute = route;

			try {
				route.navigate(pathname);
			} catch (e) {
				this._currentRoute = this.notFoundRoute;
				this.notFoundRoute?.navigate(`/${routes.notFound}`);
			}
		}
	}

    use(pathname, element, context = {}) {
		const route = new Route(pathname, element, {
			context,
		});
		this.routes.push(route);
		return this;
	}

    start() {
		window.onpopstate = (event) => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

    notFound(element) {
		this.notFoundRoute = new Route(`/404`, element, {});
		return this;
	}

    getRoute(pathname) {
		return this.routes.find((route) => route.match(pathname));
	}

    getCurrentRoute() {
		return this._currentRoute;
	}

    go(path = '') {
        if(path) {
            this.history.pushState({}, '', path)
            this._onRoute(path)
        } else {
            this.history.go()
        }
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }
}

export const router = new Router()