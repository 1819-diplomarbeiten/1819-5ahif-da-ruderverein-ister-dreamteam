import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../services/rest/dataService.js'
import PdfService from '../../../../services/pdf/pdfService.js';
import TranslationService from '../../../../services/translation/translationService.js'

//Web Component for Menu Button "Club Ranking"
export default class ClubRanking extends LitElement{
    static get properties(){
        return{
            dropDownYear: Number,
            dropDownSequence: String,
            translation: [],
            methodEntered: Boolean
        }
    }

    constructor(){
        super();
        this.methodEntered = false
        this.translation = TranslationService.getTranslation('club-ranking')
    }

    //gets called from user per button-click, manages creation of pdf club
    async getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value

        let data = await DataService.get("club-ranking", JSON.parse('{"year":"' + this.dropDownYear + '","sequence":"' + this.dropDownSequence + '"}'))

        if(data != "failure"){
            PdfService.createPdfClub(data, this.dropDownYear)
            this.shadowRoot.getElementById('notification').innerHTML = ''
        }
        else
            this.shadowRoot.getElementById('notification').innerHTML = `${this.translation["dataFail"]}`
    }

    //gets called from user per button-click, manages creation of email name reference list
    async getEmailNameList(){
        let data = await DataService.get("email-name", JSON.parse('{"club":"' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() +  '","idtoken":"' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token + '"}'))
        if(data != "failure"){
            PdfService.createEmailName(data)
            this.shadowRoot.getElementById('notificationEmailName').innerHTML = ''
        }
        else
            this.shadowRoot.getElementById('notificationEmailName').innerHTML = `${this.translation["dataFail"]}`
    }

    //button is only displayed when a club is logged in
    checkForEmailNameBtn(){
        if(this.getAttribute("isClub") == "true")
            this.shadowRoot.getElementById('email-name-container').style.display = 'initial'
    }

    //get all available years for dropdown
    async getYearsDropdown(){
        let data = await DataService.get('all-challenges')
        console.log('hi')
        console.log(data)
        if(data != "failure"){
            var select = this.shadowRoot.getElementById('dropDownYear')
            for(var i = 0; i < data.length; i ++){
                select.appendChild(this.createSingleOptionElem(data[i].year))
            }
        }
        else
            window.alert("ERROR LOADING YEARS")
    }

    //creates single option element with "year / year + 1" 
    createSingleOptionElem(year){
        var option = document.createElement('option')
        option.value = year
        option.innerHTML = year + " / " + (parseInt(year) + 1)
        return option
    }

    render(){
        $(document).ready(() => { 
            this.checkForEmailNameBtn()

            //since we recreate the document, this method would get called again and again
            if(!this.methodEntered){
                this.getYearsDropdown()
                this.methodEntered = true
            }
        }) 
        return html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/ranking/club/styles.css></link>
            
        <div class="background-image">
        </div>
        <div class="body-content">
            <h1 class="test"><strong>${this.translation["clubRankingHeadline"]}:</strong></h1>
            <h3><strong>${this.translation["rankingSubheadline"]}</strong></h3>
            <form>
                <div class="form-group">
                    <p><strong>${this.translation["rankingYear"]}</strong></p>
                    <select id="dropDownYear" class="form-control" style="width:170px">
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <p><strong>${this.translation["rankingSequence"]}</strong></p>
                    <select id="dropDownSequence" class="form-control" style="width:170px">
                        <option value="Alphabetic">${this.translation["rankingSequenceContent"].split(';')[0]}</option>
                        <option value="TopDown">${this.translation["rankingSequenceContent"].split(';')[1]}</option>
                    </select>
                </div>
            </form>
            <br>
            <input type ="button" value="${this.translation["rankingDownloadBtn"]}" class="btn btn-primary custom-color" @click="${() => this.getDistances()}"></input>
            <p id="notification"></p>
            <div id="email-name-container" style="display:none">
                <br>
                <input type ="button" value="${this.translation["clubRankingEmailNameBtn"]}" class="btn btn-primary custom-color" style="width:210px" @click="${() => this.getEmailNameList()}">
                </input><p id="notificationEmailName"></p>
            </div>
        </div>
        `
    }
}
window.customElements.define('club-ranking', ClubRanking)