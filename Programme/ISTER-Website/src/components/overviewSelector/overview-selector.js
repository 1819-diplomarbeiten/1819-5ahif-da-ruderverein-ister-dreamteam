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
            emailSchramm: ''
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

    //add event listener in case that page has to be closed
    setLoginCallback(){
        document.addEventListener("submitBtnPressed", _ => {
            this.changeContent('home')
        })
    }

    //add event listener for language changes
    setTranslationChangedCallback(){
        document.addEventListener("languageChanged", _ => {
            this.translation = TranslationService.getTranslation('overview-selector')
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
        let mainComp = this.shadowRoot.getElementById('website-content')
        this.checkForHtlLogo()

        //remove current childen
        while (mainComp.firstChild) {
            mainComp.removeChild(mainComp.firstChild);
        }

        //Set the next active component
        switch(content){
            case 'participant':
                mainComp.innerHTML = `<participant-ranking></participant-ranking>`
                break
            case 'club':
                mainComp.innerHTML = `<club-ranking isClub="${this.emailStatus == content}"></club-ranking>`
                break
            case 'distance':
                var distance = this.getDistanceSelector()
                mainComp.innerHTML = `<${distance}></${distance}>`
                break
            case 'home':
                mainComp.innerHTML = `<home-view></home-view>`
                break
            case 'ergo':
                mainComp.innerHTML = `<ergo-challenge></ergo-challenge>`
                break
            case 'login':
                this.manageLoginUsage()
                mainComp.innerHTML = `<login-form></login-form>`
                break
            case 'challenge-manager':
                mainComp.innerHTML = `<challenge-manager></challenge-manager>`
                break
            case 'edit':
                var data = DataService.get('data-participant', JSON.parse('{"email":"' + this.email + '"}'))
                mainComp.innerHTML = `<data-form firstName="${data.firstName}" lastName="${data.lastName}" birthday="${data.birthday}" weight="${data.weight}" gender="${data.gender}" club="${data.club}"></data-form>`
                break
            default:
                break
        }
    }

    //sets interval and waits until auth2 content is not null
    getEmail(){
        var x = setInterval(_ => {

            //is a user logged in?
            if(gapi.auth2.getAuthInstance() != null && gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile() != null){

                //get email
                this.email = gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail()

                //fire event that email has arrived
                let events = new CustomEvent("emailArrived", {
                    bubbles: true
                })
                document.dispatchEvent(events);

                clearInterval(x)
            }
        }, 500)
    }

    //checks for when the user logs out and disables all dependable components
    checkForLogout(){
        var x = setInterval(_ =>{
            console.log('Logout?')
            //if(der user hat sich ausgeloggt)
            if(false){
                this.shadowRoot.getElementById('participantRankingBtn').style.display = 'none'
                this.shadowRoot.getElementById('challengeManagerBtn').style.display = 'none'
                this.shadowRoot.getElementById('distanceBtn').style.display = 'none'
                console.log('seaaas')
                clearInterval(x)
            }
        }, 1000)
    }

    //user wants to login
    manageLoginUsage(){

        //get email from oauth2
        this.getEmail()

        document.addEventListener("emailArrived", _ => {

            //enable edit button
            this.shadowRoot.getElementById('editBtn').style.display = 'initial'
    
            this.checkForLogout()
            this.checkForDistanceBtn()
            this.checkForChallengeManagerBtn()
        })
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
        }
        else
            this.shadowRoot.getElementById('distanceBtn').style.display = 'none'
        
    }

    //checks which distance formular has to be displayed
    getDistanceSelector(){
        if(this.emailStatus == 'participant' || this.emailStatus == 'schramm'){
            this.shadowRoot.getElementById('participantRankingBtn').style.display = 'initial'
            return 'distance-form-participant'
        }
        else
            return 'distance-form-club'
        
    }

    render(){
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewSelector/styles.css"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
            <div class ="background">
                <p class="banner"><strong>Ergo Challenge ISTER Linz</strong></p>
            
                <div class="test">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary custom-color login-align" @click="${() => this.changeContent('login')}"><p class="text">${this.translation["loginBtn"]}</p></button>
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