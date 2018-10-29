import {LitElement, html} from '@polymer/lit-element'
//import '../../rest/dataService.js'
class PersonRanking extends LitElement{
    static get properties(){
        return {
            email: String,
            path: String,
            tableHeaders: Array,
            dropDownYear: Number,
            dropDownResult: Number,
            dropDownSequence: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/';
        this.email = 'E Mail';
        this.tableHeaders = ['First Name', 'Last Name', 'Best Four', 'Round One', 'Round Two', 'Round Three', 'Round Four', 'Round Five', 'Round Six'];
    }

    /*createNewElement(elementType, content){
        var temp = document.createElement(elementType);
        temp.innerText = content;
        return temp;
    }

    createNewRow(rowType, datas){
        let t_tr = document.createElement('tr');
        if(rowType == 'th'){
            for(var j = 0; j < this.tableHeaders.length;j++){
                t_tr.appendChild(this.createNewElement('th', this.tableHeaders[j]));
            }
        }
        else{
            t_tr.appendChild(this.createNewElement('td', datas.firstName));
            t_tr.appendChild(this.createNewElement('td', datas.lastName));
            t_tr.appendChild(this.createNewElement('td', datas.bestFourDistances));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundOne));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundTwo));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundThree));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundFour));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundFive));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundSix));
        }
        return t_tr;
    }

    allBestFourDistances(){
        let t_table = this.shadowRoot.getElementById('distanceTable')
        let t_thead = document.createElement('thead');
        let t_tbody = document.createElement('tbody');

	    fetch(this.path + 'bestFourDistances', {
            method: 'GET',
            mode: 'no-cors'
        }).then((resp) => resp.json())
        .then(data => {
            //Header Declaration
            t_thead.appendChild(this.createNewRow('th', null));
                
            //Body Declaration
			for(var i = 0; i < data.length;i++)
			{
                t_tbody.appendChild(this.createNewRow('td', data[i]))
            }
            t_table.appendChild(t_thead);
            t_table.appendChild(t_tbody);
			}
		)
		.catch(function(error){
            console.log('Error loading data')
        })
    }*/

    getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownResult = this.shadowRoot.getElementById('dropDownResult').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value

        //var msgJson = "{\"Year\":" + this.dropDownYear + ",\"Result\":" + this.evidencePic + ",\"Sequence\":\"" + this.dropDownSequence + "\"}";

        fetch(this.path + "bestFourDistances/" + this.dropDownYear + "/" + this.dropDownResult + "/" + this.dropDownSequence, {
            method: "GET",
            //mode: "no-cors",
        })
        .then((resp) => resp.json())
        .then(data => {
            this.createPdf(data)
        })
    }

    createPdf(result){
        console.log(result[0].bestFourDistances)
        var doc = new jsPDF()
        doc.setFontSize(18)
        doc.setFontType('bold')
        doc.text('First Name   Last Name   BestFour  AllSixDistances', 20, 15)
        doc.setFontSize(12)
        doc.setFontType('slim')
        for(var i = 0; i < result.length; i++){
            doc.text(result[i].firstName + '      ' + result[i].lastName + '   ' + result[i].bestFourDistances + ' ' + result[i].allSixDistances.roundOne, 20, 15 + (10 * (i+1)))
        }
        doc.save('PersonChallenge.pdf')
    }

    render(){
        return html`
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href=/src/components/personRanking/styles.css></link>
        <div class="mainPos">
            <h1>30K Person Ranking List:</h1>
            <h3>Wählen Sie ihre gewünschten Filteroptionen</h3>
            <div class="dropdown">
                <form>
                    <div class="form-group">
                        <p>Year</p>
                        <select id="dropDownYear" class="form-control">
                            <option value="2017">2017 / 2018</option>
                            <option value="2016">2016 / 2017</option>
                            <option value="2015">2015 / 2016</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>Result</p>
                        <select id="dropDownResult" class="form-control">
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
                        <select id="dropDownSequence" class="form-control">
                            <option value="Alphabetic">Alphabetic</option>
                            <option value="TopDown">TopDown</option>
                            <option value="Categories">Categories</option>
                        </select>
                    </div>
                </form>
			</div>
            <br>
            <input type ="button" value="Download pdf" class="btn btn-primary" @click="${() => this.getDistances()}"></input>
        </div>
        `
    }
}
window.customElements.define('person-ranking', PersonRanking)