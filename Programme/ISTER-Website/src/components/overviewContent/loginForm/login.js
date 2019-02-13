import {LitElement, html, eventOptions} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js'
import TranslationService from '../../../services/translation/translationService.js'

export default class LoginForm extends LitElement{
    
    constructor(){
        super();
        this.translation = TranslationService.getTranslation('overview-selector')
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

    static _handleSignInEvent(e){
        let mainComp = this.shadowRoot.getElementById('website-content')
        let elem = null
        var email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()
        console.log(JSON.parse('{"email":"' + this.email + '"}'))
        
        if(DataService.get("email-exists", JSON.parse('{"email":"' + email + '"}')) == false){
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