import {LitElement, html} from '@polymer/lit-element';

class MyApp extends LitElement{
    constructor(){
        super();
    }

    render(){
        return html`this is my first component`
    }
}

customElements.define('my-app', MyApp)