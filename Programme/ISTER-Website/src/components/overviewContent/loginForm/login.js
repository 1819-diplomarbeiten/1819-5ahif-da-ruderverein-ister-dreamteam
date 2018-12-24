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
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/loginForm/styles.css"></link>
        <div class="mainPos">
            <p id="testId">I am a Login Form</p>
            <button @click="${() => this.testMethod('testId')}">Click me</button>
            <br>
            <div id="schoenVerpackt">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Distance</strong></span>
                    </div>
                    <input id="distance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
            </div>
        </div>
        `
    }
}
window.customElements.define('login-form', LoginForm)