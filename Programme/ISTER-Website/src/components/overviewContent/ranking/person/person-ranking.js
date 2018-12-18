import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../rest/dataService.js'
import PdfWorker from '../../../../worker/pdf/pdfWorker.js'

export default class PersonRanking extends LitElement{
    static get properties(){
        return {
            path: String,
            dropDownYear: Number,
            dropDownResult: Number,
            dropDownSequence: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost/restApi/rest/';
    }

    getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownResult = this.shadowRoot.getElementById('dropDownResult').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value
        //var testit = DataService.getPersonRanking(this.dropDownYear, this.dropDownResult, this.dropDownSequence)
        
        fetch(this.path + "bestFourDistancesParticipants.php?year=" + this.dropDownYear + "&result=" + this.dropDownResult + "&sequence=" + this.dropDownSequence, {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            this.shadowRoot.getElementById('notification').innerHTML = 'Please wait, you pdf is being created ...'

            if(this.dropDownResult == '0' && this.dropDownSequence != 'Categories')
                PdfWorker.createPdfTotal(data, this.dropDownYear)
            else if(this.dropDownResult != '0' && this.dropDownSequence != 'Categories')
                PdfWorker.createPdfPerSession(data, this.dropDownYear, this.dropDownResult)
            else if(this.dropDownResult == '0' && this.dropDownSequence == 'Categories')
                PdfWorker.createPdfTotalPerCategories(data, this.dropDownYear)
            else
                PdfWorker.createPdfPerSessionPerCategories(data, this.dropDownYear, this.dropDownResult)

            this.shadowRoot.getElementById('notification').innerHTML = ''
        })
    }

    render(){
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/ranking/person/styles.css></link>
        <div class="mainPos">
            <div style="margin-left:2%">
            <h1><strong>30K Person Ranking List:</strong></h1>
            <h3>Select your filter options</h3>
                <div class="dropdown">
                    <form>
                        <div class="form-group">
                            <p>Year</p>
                            <select id="dropDownYear" class="form-control" style="width:170px">
                                <option value="2017">2017 / 2018</option>
                                <option value="2016">2016 / 2017</option>
                                <option value="2015">2015 / 2016</option>
                            </select>
                        </div>
                        <br>
                        <div class="form-group">
                            <p>Result</p>
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
                            <p>Sequence</p>
                            <select id="dropDownSequence" class="form-control" style="width:170px">
                                <option value="Alphabetic">Alphabetic</option>
                                <option value="TopDown">TopDown</option>
                                <option value="Categories">Categories</option>
                            </select>
                        </div>
                    </form>
                </div>
                <br>
                <input type ="button" value="Download pdf" class="btn btn-primary custom-color" @click="${() => this.getDistances()}"></input>
                <p id="notification"></p>
            </div>
        </div>
        `
    }
}
window.customElements.define('person-ranking', PersonRanking)