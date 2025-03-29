import { Block } from "../lib/block.js";

const cardTemplate = (props, state) => {

    return `<div class="card" data-id=${props.dataId}>
                    <h4  data-id=${props.dataId}>${props.title}</h4>
                    <p  data-id=${props.dataId}>${props.body}</p>
                </div>
    `
}

export class Card extends Block {
    constructor(props) {
        super(
            cardTemplate,
            props
        )
    }
}