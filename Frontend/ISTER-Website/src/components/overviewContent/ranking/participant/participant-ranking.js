import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../services/rest/dataService.js'
import PdfService from '../../../../services/pdf/pdfService.js'
import TranslationService from '../../../../services/translation/translationService.js'

//Web Component for Menu Button "Participants Ranking"
export default class ParticipantRanking extends LitElement{
    static get properties(){
        return {
            dropDownYear: Number,
            dropDownResult: Number,
            dropDownSequence: String,
            translation: [],
            methodEntered: Boolean
        }
    }

    constructor(){
        super();
        this.methodEntered = false
        this.translation = TranslationService.getTranslation('participant-ranking')
    }

    //get the data from service and call pdf-manage method
    async getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownResult = this.shadowRoot.getElementById('dropDownResult').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value

        var data = await DataService.get('participant-ranking', JSON.parse('{"year":"' + this.dropDownYear + '","result":"' + this.dropDownResult + '","sequence":"' + this.dropDownSequence + '"}'))
        
        if(data != "failure"){
            this.managePdfCreation(data)
            this.shadowRoot.getElementById('notification').innerHTML = ''
        }
        else
            this.shadowRoot.getElementById('notification').innerHTML = `${this.translation["dataFail"]}`
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

    //get all available years for dropdown
    async getYearsDropdown(){
        var data = await DataService.get('all-challenges')
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
            //since we recreate the document, this method would get called again and again
            if(!this.methodEntered){
                this.methodEntered = true
                this.getYearsDropdown()
            }
        }) 

        return html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/ranking/participant/styles.css></link>
        <div class="background-image">
        </div>
        <div class="body-content">
            <h1><strong>${this.translation["participantRankingHeadline"]}:</strong></h1>
            <h3><strong>${this.translation["rankingSubheadline"]}</strong></h3>
                <div class="dropdown">
                    <form>
                        <div class="form-group">
                            <p><strong>${this.translation["rankingYear"]}</strong></p>
                            <select id="dropDownYear" class="form-control" style="width:170px">
                            </select>
                        </div>
                        <br>
                        <div class="form-group">
                            <p><strong>${this.translation["rankingResult"]}</strong></p>
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
                            <p><strong>${this.translation["rankingSequence"]}</strong></p>
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
            </div>
        `
    }
}
window.customElements.define('participant-ranking', ParticipantRanking)