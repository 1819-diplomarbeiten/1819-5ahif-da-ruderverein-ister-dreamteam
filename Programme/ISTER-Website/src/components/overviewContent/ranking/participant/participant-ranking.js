import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../services/rest/dataService.js'
import PdfService from '../../../../services/pdf/pdfService.js'
import TranslationService from '../../../../services/translation/translationService.js'

export default class ParticipantRanking extends LitElement{
    static get properties(){
        return {
            path: String,
            dropDownYear: Number,
            dropDownResult: Number,
            dropDownSequence: String,
            translation: []
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost/restApi/rest/';
        this.translation = TranslationService.getTranslation('participant-ranking')
    }

    //get the data from service and call pdf-manage method
    getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownResult = this.shadowRoot.getElementById('dropDownResult').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value

        var data = DataService.getParticipantRanking(this.dropDownYear, this.dropDownResult, this.dropDownSequence)

        if(data != "failure")
            this.managePdfCreation(data)
        else
            this.shadowRoot.getElementById('notification').innerHTML = 'connection failed'
    }

    //manage the 4 types of participant pdf creation
    managePdfCreation(data){
        if(this.dropDownResult == '0' && this.dropDownSequence != 'Categories')
            PdfService.createPdfTotal(data, this.dropDownYear)
        else if(this.dropDownResult != '0' && this.dropDownSequence != 'Categories')
            PdfService.createPdfPerSession(data, this.dropDownYear, this.dropDownResult)
        else if(this.dropDownResult == '0' && this.dropDownSequence == 'Categories')
            PdfService.createPdfTotalPerCategories(data, this.dropDownYear)
        else
            PdfService.createPdfPerSessionPerCategories(data, this.dropDownYear, this.dropDownResult)
    }

    render(){
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/ranking/participant/styles.css></link>
        <h1><strong>${this.translation["participantRankingHeadline"]}:</strong></h1>
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
                            <option value="0">${this.translation["rankingAll"]}</option>
                            <option value="1">1. ${this.translation["session"]}</option>
                            <option value="2">2. ${this.translation["session"]}</option>
                            <option value="3">3. ${this.translation["session"]}</option>
                            <option value="4">4. ${this.translation["session"]}</option>
                            <option value="5">5. ${this.translation["session"]}</option>
                            <option value="6">6. ${this.translation["session"]}</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>${this.translation["rankingSequence"]}</p>
                        <select id="dropDownSequence" class="form-control" style="width:170px">
                            <option value="Alphabetic">${this.translation["rankingSequenceContent"].split(';')[0]}</option>
                            <option value="TopDown">${this.translation["rankingSequenceContent"].split(';')[1]}</option>
                            <option value="Categories">${this.translation["rankingSequenceContent"].split(';')[2]}</option>
                        </select>
                    </div>
                </form>
            </div>
            <br>
            <input type ="button" value="${this.translation["rankingDownloadBtn"]}" class="btn btn-primary custom-color" @click="${() => this.getDistances()}"></input>
            <p id="notification"></p>
        `
    }
}
window.customElements.define('participant-ranking', ParticipantRanking)