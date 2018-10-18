import {LitElement, html} from '@polymer/lit-element'

class LoginForm extends LitElement{
    constructor(){
        super();
    }

    render(){
        return html`
        <link rel="stylesheet" type="text/css" href="/src/components/loginForm/styles.css"></link>
        <div class="mainPos">
            <p>I am a Login Form</p>
        </div>
        `
    }
}
window.customElements.define('login-form', LoginForm)