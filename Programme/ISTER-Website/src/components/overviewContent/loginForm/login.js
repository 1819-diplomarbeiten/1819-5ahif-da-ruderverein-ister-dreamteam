import {LitElement, html} from '@polymer/lit-element'

export default class LoginForm extends LitElement{
    constructor(){
        super();
    }

    testMethod(paramId){
        console.log('content of p: ' + this.shadowRoot.getElementById(paramId).innerHTML)
    }

    render(){
        return html`
        <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/loginForm/styles.css"></link>
        <div class="mainPos">
            <p id="testId">I am a Login Form</p>
            <button @click="${() => this.testMethod('testId')}">Click me</button>
        </div>
        `
    }
}
window.customElements.define('login-form', LoginForm)