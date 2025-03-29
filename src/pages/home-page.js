import { Button } from '../components/button.js';
import { Card } from '../components/card.js';
import { Block } from '../lib/block.js';
import router from '../router.js';

const homePageTemplate = (props, state) => {

    let cards = [];

    if(state.data) {
        cards = state.data.map(el => new Card({
            dataId: `card-${el.id}`, 
            title: el.title, 
            body: el.body, 
            events: {
                click: (event) => {
                    router.navigate(`/post/${el.id}`)
                }
            }
        }).render().innerHTML);
    }

    return `
        <div class="post-list">
            ${state.loading ? `<div>Loading...</div>` : `${cards.join("")}`}
            
        </div>
    `
}


const redirectButton = new Button({
    dataId: 'redirectButton',
    text: 'Перейти куда-то',
    events: {
        click: (event) => {
            
            event.stopPropagation();
            router.navigate('/posts')
        }
    }
});


export class HomePage extends Block {
    constructor(props = {}) {
        super(homePageTemplate, {...props, title: 'Заголовок', redirectButton, dataId: 'home-page', events: {}})
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