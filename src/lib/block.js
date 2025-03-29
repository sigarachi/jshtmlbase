export class Block {

    _element = null;
    _props = null;
    _container = null;
    _state = null;
    _elementId = null;


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
        this._elementId = this._props.dataId
        this._addEventListeners();
        this.update();
        return this._container;
    }


    _triggerEvent(event, func) {
		const target = event.target;
		const id = target.getAttribute('data-id');

		if (target && this._elementId === id) {
			event.preventDefault();
			func.call(this, event);
		}
	}

    _addEventListeners() {
		const { events } = this._props;
        Object.keys(events).forEach((event) => {
            const app = document.querySelector('#root');
            app.addEventListener(
                event,
                (e) => {
                    this._triggerEvent(e, events[event]);
                },
                true
            );
        });
	}

	_removeEventListeners() {
		const { events = {} } = this._props;
		Object.keys(events).forEach((event) => {
			const app = document.querySelector('#root');
			app.removeEventListener(event, (e) => {
				this._triggerEvent(e, events[event]);
			});
		});
	}

    remove() {
		this._removeEventListeners();
	}
}