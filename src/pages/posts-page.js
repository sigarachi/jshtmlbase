import { Block } from '../lib/block.js';

const postsPageTemplate = (props, state) => {

    return `
        <div class="post-list">
            Страница постов
        </div>
    `
}

export class PostsPage extends Block {
    constructor(props = {}) {
        super(postsPageTemplate, {...props, title: 'Заголовок', events: {}})
    }
}