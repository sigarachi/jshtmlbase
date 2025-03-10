import { Block } from './block.js';
import { PostService } from './post-service.js';
import { router } from './router.js';

const mainPageTemplate = (props, state) => {
    if(state.loading) return `<p>Loading</p>`

    return `
        <div class="post-list">
            ${state.data && state.data.map((el) => `<div class="card"><h1>${el.body}</h1></div>`).join('')}
        </div>
    `
}

export class MainPage extends Block {
    constructor() {
        super(mainPageTemplate, {title: 'Главная'})
    }

    async beforeMount() {
        this.setState({loading: true})
        PostService.getPosts().then((response) => this.setState({data: response})).finally(() => this.setState({loading: false}))
    }
}