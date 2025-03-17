import { Page } from './page.js';

const homePageTemplate = (props, state) => {
    if(state.loading) return `<p>Loading...</p>`

    return `
        <div class="post-list">
            ${state.data && state.data.map((el) => `
                <div class="card">
                    <h4>${el.title}</h4>
                    <p>${el.body}</p>
                </div>
                `).join('')}
        </div>
    `
}

export class HomePage extends Page {
    constructor() {
        super(homePageTemplate, {title: 'Заголовок'})
    }

    async beforeMount() {
        this.setState({loading: true})
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')

            const data = await response.json();

            this.setState({data})
        } catch(e) {
            console.error(e);
        } finally {
            this.setState({loading: false})
        }
    }
}