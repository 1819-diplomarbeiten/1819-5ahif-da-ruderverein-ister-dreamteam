import {LitElement, html} from '@polymer/lit-element'
//import DataService from '../../rest/dataService.js'
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
        this.lastUsedContent = 'home-view'
        this.translation = TranslationService.getTranslation('overview-selector')
        this.lastLanguage = TranslationService.getCurrentLanguage()
        this.startTranslationDetection()
    }

    startTranslationDetection(){
        setInterval(_ => {
            var tmp = TranslationService.getCurrentLanguage()
            if(tmp != this.lastLanguage){
                this.translation = TranslationService.getTranslation('overview-selector')
                this.lastLanguage = tmp
                this.changeContent(this.lastUsedContent)
            }
        }, 500);
    }
    
    changeWebsite(){
        window.location.replace('http://www.ister.at/Ister1/')
    }

    changeContent(content){
        this.lastUsedContent = content
        let elem = null
        let mainComp = this.shadowRoot.getElementById('components')

        //removes all children
        while (mainComp.firstChild) {
            mainComp.removeChild(mainComp.firstChild);
        }

        //Set the next "main" component
        switch(content){
            case 'person':
                elem = document.createElement('participant-ranking')
                mainComp.appendChild(elem)
                break
            case 'club':
                elem = document.createElement('club-ranking')
                mainComp.appendChild(elem)
                break
            case 'distance':
                elem = document.createElement('distance-form-club')
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

    checkForDistanceBtn(){
        fetch('http://localhost/restApi/rest/challengestatus.php', {
                method: "GET"
            })
            .then((resp) => resp.json())
            .then(data => {
                //if(data.status == "true")
                if(data.status == false)
                    this.shadowRoot.getElementById('distanceBtn').style.display = 'initial'
            })
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
                <div>
                    <div class="banner">
                        <p><strong>Ergo Challenge ISTER Linz</strong></p>
                    </div>   
                    <button type="button" class="btn btn-primary custom-color login-align" style="height:40px" @click="${() => this.changeContent('login')}"><p class="text">Login</p></button>
                </div>
                <div class="componentSelection">
                    <div class="singleComponent">
                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" class="btn btn-primary custom-color" style="height:40px" @click="${() => this.changeContent('home')}"><p class="text">${this.translation["homeBtn"]}</p></button>
                                <button type="button" class="btn btn-primary custom-color" style="height:40px" @click="${() => this.changeContent('ergo')}"><p class="text">${this.translation["ergoBtn"]}</p></button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Second group">
                                <button type="button" class="btn btn-primary custom-color" style="height:40px" @click="${() => this.changeContent('club')}"><p class="text">${this.translation["clubRankingBtn"]}</p></button>
                                <button type="button" class="btn btn-primary custom-color" style="height:40px" @click="${() => this.changeContent('person')}"><p class="text">${this.translation["participantRankingBtn"]}</p></button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Third group">
                                <button id="distanceBtn" type="button" class="btn btn-primary custom-color" style="height:40px;display:none" @click="${() => this.changeContent('distance')}"><p class="text">${this.translation["distanceBtn"]}</p></button>
                                <button type="button" class="btn btn-primary custom-color" style="height:40px" @click="${() => this.changeWebsite()}"><p class="text">LRV Ister</p></button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Fourth group">
                                <button type="button" class="btn btn-primary custom-color" style="height:40px" @click="${() => this.changeContent('challenge-manager')}"><p class="text">Challenge Manager</p></button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <div id="components" class="body-content">
                <home-view></home-view>
            </div>
            `
    }
}
window.customElements.define('overview-selector', OverviewSelector);