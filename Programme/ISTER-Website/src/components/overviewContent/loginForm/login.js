import {LitElement, html, eventOptions} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js'

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
        <div id="website-content" class="body-container">
        <google-signin id="signinBtn" client-id="863083094018-90dqbb2kvkiaog6tugmd5gagr7kgf483.apps.googleusercontent.com" @google-signin-success="${(e) => this._handleSignInEvent(e)}"></google-signin>
        </div>
        `
    }

    _handleSignInEvent(e){
        let mainComp = this.shadowRoot.getElementById('website-content')
        let elem = null
        console.log(mainComp)
        var email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()
        console.log(email)
        if(DataService.get("email-exists", JSON.parse('{"email":"' + this.email + '"}')) == false){
            console.log("FORMULAR!")
            elem = document.createElement('data-form')
            while (mainComp.firstChild) {
                mainComp.removeChild(mainComp.firstChild);
            }
            mainComp.appendChild(elem)
        }

    }
}
window.customElements.define('login-form', LoginForm)