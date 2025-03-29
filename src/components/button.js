import { Block } from "../lib/block.js";

const buttonTemplate = (props, state) => {
    
    return `
        <button data-id=${props.dataId}>${props.text}</button>
    `
}

export class Button extends Block {
    constructor(props) {
        super(
            buttonTemplate,
            props
        )
    }
}