import { Route } from './route.js';

export class Router {
    routes = [];
    history = window.history;
    _currentRoute = null;
    __instance = null;
    notFoundRoute = null;
    _lastProcessedPath = null; 

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        Router.__instance = this;
    }

    _onRoute(path) {
        if (this._lastProcessedPath === path) {
            return;
        }

        const route = this.getRoute(path);
        this._lastProcessedPath = path;

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        if (!route) {
            if (this.notFoundRoute) {
                this._currentRoute = this.notFoundRoute;
                this.notFoundRoute.navigate('/404');
            }
            return;
        }

        this._currentRoute = route;
        try {
            route.navigate(path);
        } catch (e) {
            console.error('Route navigation error:', e);
            if (this.notFoundRoute) {
                this._currentRoute = this.notFoundRoute;
                this.notFoundRoute.navigate('/404');
            }
        }
    }

    use(path, element, context = {}) {
        const route = new Route(path, element, { context });
        this.routes.push(route);
        return this;
    }

    start() {
        const debouncedOnPopState = this._debounce((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }, 50);

        window.onpopstate = debouncedOnPopState;
        this._onRoute(window.location.pathname);
    }

    getRoute(path) {
        return this.routes.find(route => route.match(path));
    }

    navigate(path = '') {
        if (!path) {
            this.history.go();
            return;
        }

        if (this._lastProcessedPath === path) {
            return;
        }

        this.history.pushState({}, '', path);
        this._onRoute(path);
    }

    _debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

const router = new Router();
export default router;