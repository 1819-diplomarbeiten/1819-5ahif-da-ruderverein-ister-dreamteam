import {LitElement, html, eventOptions} from '@polymer/lit-element'


export default class LoginForm extends LitElement{
    
    constructor(){
        super();
    }

    ready(){
        super.ready()
        this.addEventListener('on-google-signin-success', this._handleSignInEvent)
    }

        

    testMethod(paramId){
        console.log('content of p: ' + this.shadowRoot.getElementById(paramId).innerHTML)
    }


    render(){
        return html`
        <head>
        <link rel="import" href="../../../../bower_components/google-signin/google-signin.html">
        </head>
        <google-signin id="signinBtn" client-id="863083094018-90dqbb2kvkiaog6tugmd5gagr7kgf483.apps.googleusercontent.com" @google-signin-success="${(e) => this._handleSignInEvent(e)}"></google-signin>
        `
    }

    _handleSignInEvent(e){
        console.log('type', e.type, e)
        console.log(gapi.auth2.getAuthInstance()['currentUser'].get())
        this.eventName = e.type
        this.eventDetail = JSON.stringify(e.detail)

    }
}
window.customElements.define('login-form', LoginForm)