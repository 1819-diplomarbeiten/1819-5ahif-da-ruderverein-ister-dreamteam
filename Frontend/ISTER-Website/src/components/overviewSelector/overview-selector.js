import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../services/rest/dataService.js'
import TranslationService from '../../services/translation/translationService.js'

//Web Component for Selector Toolbar (Banner, Menu Button, Login)
export default class OverviewSelector extends LitElement{
    static get properties(){
        return {
            translation: [],
            lastUsedContent: '',
            email: '',
            emailStatus: '',
            emailSchramm: '',
            distanceSelector: '',
            isEdit: Boolean
        }
    }

    constructor(){
        super();

        //email from hr schramm
        this.emailSchramm = 'schramm@nomail.com'

        //set first "default" content
        this.lastUsedContent = 'home'

        //load translation for this component
        this.translation = TranslationService.getTranslation('overview-selector')

        this.setTranslationChangedCallback()
        this.setLoginCallback()
    }

    //add event listener in case the login page has to be closed
    setLoginCallback(){
        document.addEventListener("submitBtnPressed", () => {
            this.changeContent('home')

            //enable all buttons
            this.changeButtonsBarClickablity()
            
            //display edit button if participant logged in
            if(this.emailStatus == 'participant' || this.emailStatus == 'schramm')
                this.shadowRoot.getElementById('editBtn').style.display = 'initial'
            else
                this.shadowRoot.getElementById('editBtn').style.display = 'none'

        })

        document.addEventListener("submitBtnPressedEdit", () => {
            this.changeContent('home')
            //display edit button if participant logged in
            if(this.emailStatus == 'participant' || this.emailStatus == 'schramm')
                this.shadowRoot.getElementById('editBtn').style.display = 'initial'
            else
                this.shadowRoot.getElementById('editBtn').style.display = 'none'
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
    changeWebsite(type){
        if(type == 'ISTER')
            window.location.replace('http://www.ister.at/Ister1/')
        else if(type == 'MAIN')
            window.location.replace('http://ergo-challenge.ister.at/')
    }

    //sets the new page body content / component
    changeContent(content){
        this.lastUsedContent = content
        let websiteContent = this.shadowRoot.getElementById('website-content')

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
                this.handleEditUsage(websiteContent)
                break
            case 'data-form':
                websiteContent.innerHTML = `<data-form></data-form>`
            default:
                break
        }
    }

    async handleEditUsage(websiteContent){
        let data = await DataService.get('data-participant', JSON.parse('{"email":"' + this.email + '","idtoken":"' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token + '"}'))
        
        if(data != "failure")
            websiteContent.innerHTML = `<data-form firstName="${data.firstName}" lastName="${data.lastName}" birthday="${data.birthday}" weight="${data.weight}" gender="${data.gender}" club="${data.club}"></data-form>`
        else
            window.alert('CONNECTION ERROR')
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
        document.addEventListener("submitBtnPressed", () => {
            this.startChecking()
        })
    }

    //since we want to program async, we have to outsource the code from event listener
    async startChecking(){
        await this.checkForDistanceBtn()
        await this.checkForParticipantRanking()
        await this.checkForChallengeManagerBtn()
    }

    //checks if participant ranking button has to be enabled
    async checkForParticipantRanking(){
        let email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()
        let data = await DataService.get('challenge-status', JSON.parse('{"email":"' + email + '"}'))
        this.emailStatus = data.emailStatus
        if(this.emailStatus == "participant" || this.emailStatus == "schramm")
            this.shadowRoot.getElementById('participantRankingBtn').style.display = 'initial'
    }

    //checks if challenge manager button has to be enabled
    checkForChallengeManagerBtn(){
        this.email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()
        if(this.email == this.emailSchramm)
            this.shadowRoot.getElementById('challengeManagerBtn').style.display = 'initial'
    }
    
    //check if there is a challenge running
    async checkForDistanceBtn(){
        let email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()
        let data = await DataService.get('challenge-status', JSON.parse('{"email":"' + email + '"}'))

        if(data != "failure"){  
            if(this.emailStatus == "participant" || this.emailStatus == "schramm")   
                this.shadowRoot.getElementById('editBtn').style.display = 'initial'
            else
                this.shadowRoot.getElementById('editBtn').style.display = 'none'
            if(data.challengeStatus == "true"){
                this.shadowRoot.getElementById('distanceBtn').style.display = 'initial'
                this.emailStatus = data.emailStatus
                this.setDistanceSelectors()
            }
            else
                this.shadowRoot.getElementById('distanceBtn').style.display = 'none'
        }
        else
            window.alert('CONNECTION ERROR')
    }

    //checks which distance formular has to be displayed
    setDistanceSelectors(){
        console.log(this.emailStatus)
        if(this.emailStatus == 'participant' || this.emailStatus == 'schramm') {
            
            
            this.distanceSelector = 'distance-form-participant'
        }
        else if(this.emailStatus == 'club')
            this.distanceSelector = 'distance-form-club'
        
    }

    async handleSignInEvent(e){
        this.changeButtonsBarClickablity()

        var email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()

        DataService.post( gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token,"send-token")
        
        let emailExists = await DataService.get("email-exists", JSON.parse('{"email":"' + email + '"}'))

        if(emailExists != "failure"){          
            if(!emailExists){
                this.changeContent('data-form')
            }
            else{
                this.changeContent ('home')
                this.startChecking()
                this.changeButtonsBarClickablity()
            }
            this.manageLoginUsage()
        }
        else
            window.alert('CONNECTION ERROR')
    }

    //checks for when the user logs out and disables all dependable components
    handleSignOutEvent(e){
        this.shadowRoot.getElementById('participantRankingBtn').style.display = 'none'
        this.shadowRoot.getElementById('challengeManagerBtn').style.display = 'none'
        this.shadowRoot.getElementById('distanceBtn').style.display = 'none'
        this.shadowRoot.getElementById('editBtn').style.display = 'none'
        this.changeContent('home')

        //check if buttons bar is still disabled
        if(this.shadowRoot.getElementById('homeBtn').disabled)
            this.changeButtonsBarClickablity()
    }

    //check visibilty of buttons bar and change it
    changeButtonsBarClickablity(){
        var state = false

        if(!this.shadowRoot.getElementById('homeBtn').disabled)
            state = true

        this.shadowRoot.getElementById('homeBtn').disabled = state
        this.shadowRoot.getElementById('ergoBtn').disabled = state
        this.shadowRoot.getElementById('clubBtn').disabled = state
        this.shadowRoot.getElementById('participantRankingBtn').disabled = state
        this.shadowRoot.getElementById('distanceBtn').disabled = state
        this.shadowRoot.getElementById('isterBtn').disabled = state
        this.shadowRoot.getElementById('mainBtn').disabled = state
        this.shadowRoot.getElementById('challengeManagerBtn').disabled = state
    }

    render(){
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewSelector/styles.css"></link>
            <link rel="import" href="../../../../bower_components/google-signin/google-signin.html">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
            <div class ="background">
                <p class="banner"><strong>Ergo Challenge ISTER Linz</strong></p>
                <img id="htl" src="images/htl_logo_transparent.png" width="225" height="36" class="image-htl">
            
                <div class="login-group">
                    <div class="btn-group mr-2" role="group" aria-label="First group" id="testBla">
                    <google-signin id="signinBtn" client-id="863083094018-90dqbb2kvkiaog6tugmd5gagr7kgf483.apps.googleusercontent.com" @google-signin-success="${(e) => this.handleSignInEvent(e)}"" @google-signed-out="${(e) => this.handleSignOutEvent(e)}"></google-signin>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button id="editBtn" style="display:none" type="button" class="btn btn-primary custom-color login-align" @click="${() => this.changeContent('edit')}"><p class="text"><i class="glyphicon glyphicon-user"></i></p></button>
                    </div>
                </div>

                <div class="btn-toolbar componentSelection" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button id="homeBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('home')}"><p class="text">${this.translation["homeBtn"]}</p></button>
                        <button id="ergoBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('ergo')}"><p class="text">${this.translation["ergoBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                        <button id="clubBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('club')}"><p class="text">${this.translation["clubRankingBtn"]}</p></button>
                        <button id="participantRankingBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('participant')}" style="display:none"><p class="text">${this.translation["participantRankingBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Third group">
                        <button id="distanceBtn" type="button" class="btn btn-primary custom-color" style="display:none" @click="${() => this.changeContent('distance')}"><p class="text">${this.translation["distanceBtn"]}</p></button>
                        <button id="isterBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeWebsite('ISTER')}"><p class="text">LRV Ister</p></button>
                        <button id="mainBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeWebsite('MAIN')}"><p class="text">${this.translation["mainpageBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Fourth group">
                        <button id="challengeManagerBtn" type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('challenge-manager')}" style="display:none"><p class="text">Challenge Manager</p></button>
                    </div>
                </div>
            </div>
            <div id="website-content" class="body-container">
                <home-view></home-view>
            </div>
            `
    }
}
window.customElements.define('overview-selector', OverviewSelector);