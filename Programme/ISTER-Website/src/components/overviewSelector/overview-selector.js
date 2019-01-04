import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../services/rest/dataService.js'
import TranslationService from '../../services/translation/translationService.js'

export default class OverviewSelector extends LitElement{
    static get properties(){
        return {
            translation: [],
            lastLanguage: '',
            lastUsedContent: ''
        }
    }

    constructor(){
        super();
        this.lastUsedContent = 'home'
        this.translation = TranslationService.getTranslation('overview-selector')
        this.lastLanguage = TranslationService.getCurrentLanguage()
        this.startTranslationDetection()
    }

    //checks in an 500ms interval if the language has changed, if so the website content gets refreshed
    startTranslationDetection(){
        setInterval(_ => {
            var currentLanguage = TranslationService.getCurrentLanguage()
            if(currentLanguage != this.lastLanguage){
                this.translation = TranslationService.getTranslation('overview-selector')
                this.lastLanguage = currentLanguage
                this.changeContent(this.lastUsedContent)
            }
        }, 500);
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

    //changes the website content
    changeContent(content){
        this.lastUsedContent = content
        let elem = null
        let mainComp = this.shadowRoot.getElementById('website-content')
        this.checkForHtlLogo()

        //remove current childen
        while (mainComp.firstChild) {
            mainComp.removeChild(mainComp.firstChild);
        }

        //Set the next active component
        switch(content){
            case 'participant':
                elem = document.createElement('participant-ranking')
                mainComp.appendChild(elem)
                break
            case 'club':
                elem = document.createElement('club-ranking')
                mainComp.appendChild(elem)
                break
            case 'distance':
                var distance = this.getDistanceSelector()
                elem = document.createElement(distance)
                mainComp.appendChild(elem)
                break
            case 'home':
                elem = document.createElement('home-view')
                mainComp.appendChild(elem)
                break
            case 'ergo':
                elem = document.createElement('ergo-challenge')
                mainComp.appendChild(elem)
                break
            case 'login':
                elem = document.createElement('login-form')
                mainComp.appendChild(elem)
                break
            case 'challenge-manager':
                elem = document.createElement('challenge-manager')
                mainComp.appendChild(elem)
                break
            default:
                break
        }
    }

    //checks which distance formular has to be displayed
    getDistanceSelector(){
        //if(a club is logged in)
        if(true)
            return 'distance-form-club'
        else
            return 'distance-form-participant'
    }

    //check if there is a challenge running
    checkForDistanceBtn(){
        var data = DataService.get('challenge-status')

        //if(data.status == "true")
        if(data.status == false)
            this.shadowRoot.getElementById('distanceBtn').style.display = 'initial'
    }

    render(){
        $(document).ready(() => { 
            this.checkForDistanceBtn()  
        }) 
        return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewSelector/styles.css"></link>
            <div class ="background">
                <p class="banner"><strong>Ergo Challenge ISTER Linz</strong></p>
                <button type="button" class="btn btn-primary custom-color login-align" @click="${() => this.changeContent('login')}"><p class="text">Login</p></button>
                
                <div class="btn-toolbar componentSelection" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('home')}"><p class="text">${this.translation["homeBtn"]}</p></button>
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('ergo')}"><p class="text">${this.translation["ergoBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('club')}"><p class="text">${this.translation["clubRankingBtn"]}</p></button>
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('participant')}"><p class="text">${this.translation["participantRankingBtn"]}</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Third group">
                        <button id="distanceBtn" type="button" class="btn btn-primary custom-color" style="display:none" @click="${() => this.changeContent('distance')}"><p class="text">${this.translation["distanceBtn"]}</p></button>
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeWebsite()}"><p class="text">LRV Ister</p></button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Fourth group">
                        <button type="button" class="btn btn-primary custom-color" @click="${() => this.changeContent('challenge-manager')}"><p class="text">Challenge Manager</p></button>
                    </div>
                </div>
            </div>
            <div id="website-content" class="body-container">
                <home-view></home-view>
            </div>
            <img id="htl" src="images/htl-leonding.jpg" width="100" height="100" class="image-htl">
            `
    }
}
window.customElements.define('overview-selector', OverviewSelector);