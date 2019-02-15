import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../services/rest/dataService.js'
import TranslationService from '../../services/translation/translationService.js'
import LoginForm from '../overviewContent/loginForm/login.js'

//Web Component for Selector Toolbar (Banner, Menu Button, Login)
export default class OverviewSelector extends LitElement{
    static get properties(){
        return {
            translation: [],
            lastUsedContent: '',
            email: '',
            emailStatus: '',
            emailSchramm: '',
            distanceSelector: ''
        }
    }

    constructor(){
        super();

        //email from hr schramm
        this.emailSchramm = 'daniel.maz99@gmail.com'

        //set first "default" content
        this.lastUsedContent = 'home'

        //load translation for this component
        this.translation = TranslationService.getTranslation('overview-selector')

        this.setTranslationChangedCallback()
        this.setLoginCallback()
    }

    //add event listener in case the login page has to be closed
    setLoginCallback(){
        document.addEventListener("submitBtnPressed", _ => {
            this.changeContent('home')
            
            //enable edit button if participant logged in
            if(this.emailStatus != 'club')
                this.shadowRoot.getElementById('editBtn').style.display = 'initial'
        })
    }

    //add event listener for language changes
    setTranslationChangedCallback(){
        document.addEventListener("languageChanged", _ => {

            //get new translation for this component
            this.translation = TranslationService.getTranslation('overview-selector')

            //refresh the website body content because of the new language
            this.changeContent(this.lastUsedContent)
        })
    }
    
    //redirect to ister website
    changeWebsite(){
        window.location.replace('http://www.ister.at/Ister1/')
    }

    //disable htl-logo if home view component is not displayed
    checkForHtlLogo(){
        if(this.lastUsedContent != 'home')
            this.shadowRoot.getElementById('htl').style.display = 'none'
        else
            this.shadowRoot.getElementById('htl').style.display = 'initial'
    }

    //sets the new page body content / component
    changeContent(content){
        this.lastUsedContent = content
        let websiteContent = this.shadowRoot.getElementById('website-content')
        this.checkForHtlLogo()

        //remove current childen
        while (websiteContent.firstChild) {
            websiteContent.removeChild(websiteContent.firstChild);
        }

        //Set the next active component
        switch(content){
            case 'participant':
                websiteContent.innerHTML = `<participant-ranking></participant-ranking>`
                break
            case 'club':
                websiteContent.innerHTML = `<club-ranking isClub="${this.emailStatus == content}"></club-ranking>`
                break
            case 'distance':
                websiteContent.innerHTML = `<${this.distanceSelector}></${this.distanceSelector}>`
                break
            case 'home':
                websiteContent.innerHTML = `<home-view></home-view>`
                break
            case 'ergo':
                websiteContent.innerHTML = `<ergo-challenge></ergo-challenge>`
                break
            case 'login':
                this.manageLoginUsage()
                
                break
            case 'challenge-manager':
                websiteContent.innerHTML = `<challenge-manager></challenge-manager>`
                break
            case 'edit':
                var data = DataService.get('data-participant', JSON.parse('{"email":"' + this.email + '"}'))
                websiteContent.innerHTML = `<data-form firstName="${data.firstName}" lastName="${data.lastName}" birthday="${data.birthday}" weight="${data.weight}" gender="${data.gender}" club="${data.club}"></data-form>`
                break
            case 'data-form':
                websiteContent.innerHTML = `<data-form></data-form>`
            default:
                break
        }
    }

    //sets interval and waits until auth2 content is not null
    getEmail(){
        var x = setInterval(_ => {

            //is a user logged in?
            if(gapi.auth2.getAuthInstance() != null && gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile() != null){

                //load email in local variable
                this.email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()

                //fire event that email has arrived
                document.dispatchEvent(
                    new CustomEvent("emailArrived", {
                        bubbles: true
                }));

                clearInterval(x)
            }
        }, 500)
    }

    //user wants to login
    manageLoginUsage(){

        //get email from oauth2
        this.getEmail()

        //by listener we get informed when the email has arrived
        document.addEventListener("emailArrived", _ => {
            this.checkForDistanceBtn()
            this.checkForParticipantRanking()
            this.checkForChallengeManagerBtn()
        })
    }

    //checks if participant ranking button has to be enabled
    checkForParticipantRanking(){
        if(this.emailStatus == "participant")
            this.shadowRoot.getElementById('participantRankingBtn').style.display = 'initial'
    }

    //checks if challenge manager button has to be enabled
    checkForChallengeManagerBtn(){
        if(this.email == this.emailSchramm)
            this.shadowRoot.getElementById('challengeManagerBtn').style.display = 'initial'
    }
    
    //check if there is a challenge running
    checkForDistanceBtn(){
        var data = DataService.get('challenge-status', JSON.parse('{"email":"' + this.email + '"}'))

        if(data.challengeStatus == "true"){
            this.shadowRoot.getElementById('distanceBtn').style.display = 'initial'
            this.emailStatus = data.emailStatus
            this.setDistanceSelectors()
        }
        else
            this.shadowRoot.getElementById('distanceBtn').style.display = 'none'
        
    }

    //checks which distance formular has to be displayed
    setDistanceSelectors(){
        if(this.emailStatus == 'participant' || this.emailStatus == 'schramm') {
            this.distanceSelector = 'distance-form-participant'

            //when participant or hr. schramm is logged in, we also have to enable the participant ranking button
            this.shadowRoot.getElementById('participantRankingBtn').style.display = 'initial'
        }
        else
            this.distanceSelector = 'distance-form-club'
        
    }

    _handleSignInEvent(e){
        var email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()

        if(DataService.get("email-exists", JSON.parse('{"email":"' + email + '"}')) == false){
            this.changeContent('data-form')
        }
        else{
            //nach testen this.changeContent ('home')
            this.changeContent('data-form')
        }
        this.manageLoginUsage()
    }

    //checks for when the user logs out and disables all dependable components
    _handleSignOutEvent(e){
        this.shadowRoot.getElementById('participantRankingBtn').style.display = 'none'
        this.shadowRoot.getElementById('challengeManagerBtn').style.display = 'none'
        this.shadowRoot.getElementById('distanceBtn').style.display = 'none'
        this.shadowRoot.getElementById('editBtn').style.display = 'none'
        this.changeContent('home')
    }

    render(){
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewSelector/styles.css"></link>
            <link rel="import" href="../../../../bower_components/google-signin/google-signin.html">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
            <div class ="background">
                <p class="banner"><strong>Ergo Challenge ISTER Linz</strong></p>
            
                <div class="login-group">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                    <google-signin id="signinBtn" client-id="863083094018-90dqbb2kvkiaog6tugmd5gagr7kgf483.apps.googleusercontent.com" @google-signin-success="${(e) => this._handleSignInEvent(e)}"" @google-signed-out="${(e) => this._handleSignOutEvent(e)}"></google-signin>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button id="editBtn" style="display:none" type="button" class="btn btn-primary custom-color login-align" @click="${() => this.changeContent('edit')}"><p class="text"><i class="fas fa-cogs"></i></p></button>
                    </div>
                </div>

                <div class="btn-toolbar componentSelection" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('home')}"><p class="text">${this.translation["homeBtn"]}</p></button>
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('ergo')}"><p class="text">${this.translation["ergoBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('club')}"><p class="text">${this.translation["clubRankingBtn"]}</p></button>
                        <button id="participantRankingBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('participant')}" style="display:none"><p class="text">${this.translation["participantRankingBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Third group">
                        <button id="distanceBtn" type="button" class="btn btn-primary custom-color" style="display:none" @click="${() => this.changeContent('distance')}"><p class="text">${this.translation["distanceBtn"]}</p></button>
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeWebsite()}"><p class="text">LRV Ister</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Fourth group">
                        <button id="challengeManagerBtn"type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('challenge-manager')}" style="display:none"><p class="text">Challenge Manager</p></button>
                    </div>
                </div>
            </div>
            <div id="website-content" class="body-container">
                <home-view></home-view>
            </div>
            <img id="htl" src="images/htl-leonding.jpg" width="100" height="16" class="image-htl">
            `
    }
}
window.customElements.define('overview-selector', OverviewSelector);