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
        <div id="website-content" class="body-container">
        </div>
        `
    }

    static async _handleSignInEvent(e){
        console.log('hellooooo, i am entering this method')
        let mainComp = this.shadowRoot.getElementById('website-content')
        let elem = null
        var email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()
        console.log(JSON.parse('{"email":"' + this.email + '"}'))
        let emailExists = await DataService.get("email-exists", JSON.parse('{"email":"' + email + '"}'))
        
        if(emailExists != "failure" && !emailExists){
            elem = document.createElement('data-form')
            while (mainComp.firstChild) {
                mainComp.removeChild(mainComp.firstChild);
            }
            mainComp.appendChild(elem)
        }
        else{
            elem = document.createElement('ergo-challenge')
            while (mainComp.firstChild) {
                mainComp.removeChild(mainComp.firstChild);
            }
            mainComp.appendChild(elem)
        }
        // var auth2 = gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        // });
        // auth2.disconnect();

    }
}
window.customElements.define('login-form', LoginForm)