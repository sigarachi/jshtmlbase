import { Button } from '../components/button.js';
import { Block } from '../lib/block.js';
import router from '../router.js';

const postPageTemplate = (props, state) => {

    return `
        <div class="post-list">
            ${props.back.render().innerHTML}
            ${props.params.id}
        </div>
    `
}

const backToHomeButton = new Button({
    dataId: 'back-button',
    text: 'Назад',
    events: {
        click: (event) => {
            event.stopPropagation();
            router.navigate('/')
        }
    }
})

export class PostPage extends Block {
    constructor(props = {}) {
        super(postPageTemplate, {...props, title: 'Заголовок', back: backToHomeButton,  events: {}})
    }
}