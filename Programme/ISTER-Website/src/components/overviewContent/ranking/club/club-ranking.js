import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../services/rest/dataService.js'
import PdfService from '../../../../services/pdf/pdfService.js';
import TranslationService from '../../../../services/translation/translationService.js'

export default class ClubRanking extends LitElement{
    static get properties(){
        return{
            dropDownYear: Number,
            dropDownResult: Number,
            dropDownSequence: String,
            path: String,
            translation: []
        }
    }

    constructor(){
        super();
        this.path = 'http://localhost/restApi/rest/';
        this.translation = TranslationService.getTranslation('club-ranking')
    }

    getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownResult = this.shadowRoot.getElementById('dropDownResult').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value
        
        fetch(this.path + "bestfourdistancesclubs.php?year=" + this.dropDownYear + "&result=" + this.dropDownResult + "&sequence=" + this.dropDownSequence, {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            this.shadowRoot.getElementById('notification').innerHTML = 'Please wait, you pdf is being created ...'
            PdfService.createPdfClub(data, this.dropDownYear)
            this.shadowRoot.getElementById('notification').innerHTML = ''
        })
    }

    getEmailNameList(){
        fetch('http://localhost:8080/testserver/rs/sql/getEmailDistanceReference', {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then(data => {
            PdfService.createEmailDistance(data)
        })
    }

    checkForEmailDistanceBtn(){
        //if(a club is logged in)
        if(true)
            this.shadowRoot.getElementById('email-distance-container').style.visibility = 'visible'
    }

    render(){
        $(document).ready(() => { 
            this.checkForEmailDistanceBtn()
        }) 
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/ranking/club/styles.css></link>
        <div class="mainPos">
            <div style="margin-left:2%">
                <h1><strong>${this.translation["clubRankingHeadline"]}:</strong></h1>
                <h3>${this.translation["rankingSubheadline"]}</h3>
                <div class="dropdown">
                    <form>
                        <div class="form-group">
                            <p>${this.translation["rankingYear"]}</p>
                            <select id="dropDownYear" class="form-control" style="width:170px">
                                <option value="2017">2017 / 2018</option>
                                <option value="2016">2016 / 2017</option>
                                <option value="2015">2015 / 2016</option>
                            </select>
                        </div>
                        <br>
                        <div class="form-group">
                            <p>${this.translation["rankingResult"]}</p>
                            <select id="dropDownResult" class="form-control" style="width:170px">
                                <option value="0">Total</option>
                                <option value="1">1st Session</option>
                                <option value="2">2nd Session</option>
                                <option value="3">3rd Session</option>
                                <option value="4">4th Session</option>
                                <option value="5">5th Session</option>
                                <option value="6">6th Session</option>
                            </select>
                        </div>
                        <br>
                        <div class="form-group">
                            <p>${this.translation["rankingSequence"]}</p>
                            <select id="dropDownSequence" class="form-control" style="width:170px">
                                <option value="Alphabetic">${this.translation["clubRankingSequenceContent"].split(';')[0]}</option>
                                <option value="TopDown">${this.translation["clubRankingSequenceContent"].split(';')[1]}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <br>
                <input type ="button" value="${this.translation["rankingDownloadBtn"]}" class="btn btn-primary custom-color" @click="${() => this.getDistances()}"></input>
                <p id="notification"></p>
                <div id="email-distance-container" style="visibility:hidden">
                    <p>------------------------</p>
                    <input type ="button" value="${this.translation["clubRankingEmailDistanceBtn"]}" class="btn btn-primary custom-color" style="width:210px" @click="${() => this.getEmailNameList()}"></input>
                </div>
            </div>
        </div>
        `
    }
}
window.customElements.define('club-ranking', ClubRanking)