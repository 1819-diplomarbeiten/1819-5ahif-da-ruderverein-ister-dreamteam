import {LitElement, html} from '@polymer/lit-element'

class AddItem extends LitElement{
    static get properties(){
        return {
            todoList: Array,
            todoItem: String
        }
    }
    constructor(){
        super();
        this.todoItem = 'blablabla';
    }

    /*inputKeypress(e){
        console.log('entered inputKeypress')
        if(e.keyCode == 13){
            //call add item
        }
        else{
            this.todoItem = e.target.value;
        }
        console.log(this.todoItem);
    }*/

    render(){
        /*return html`
        <div>
            <input value=${this.todoItem}
            on-keyup="${(e) => this.inputKeypress(e)}">
            </input>
        </div>
        `*/
        return html`
        
        `
    }
}
 window.customElements.define('add-item', AddItem);