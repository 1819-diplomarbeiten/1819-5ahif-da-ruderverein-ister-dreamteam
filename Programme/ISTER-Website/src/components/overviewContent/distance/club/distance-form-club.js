import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../rest/dataService.js'

class DistanceFormClub extends LitElement{
    static get properties(){
        return {
            path: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost:8080/testserver/rs/sql/'
    }

    postPeriods(){
        var file = this.shadowRoot.getElementById('excelFile').files[0]
        var fileReader = new FileReader();
        if(this.distance == "" || this.shadowRoot.getElementById('excelFile').files[0] == undefined)
            this.shadowRoot.getElementById('notification').innerHTML = 'no Excel selected'

        fileReader.onload = e => {
            var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;

            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }

            var workbook = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
            workbook.SheetNames.forEach(sheetName => {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var jsonObj = JSON.stringify(XL_row_object);
                if(this.excelIsValid(XL_row_object) == false)
                    this.shadowRoot.getElementById('notification').innerHTML = 'Excel data invalid'
                else {
                    DataService.postPeriods(jsonObj)
                    this.shadowRoot.getElementById('notification').innerHTML = 'Succesfully sent'
                }
            })
        }
        fileReader.readAsArrayBuffer(file)
    }

    excelIsValid(jsonObj){
        if(jsonObj[0].Distance == undefined || jsonObj[0].Email == undefined){
            return false
        }

        for(var i = 0; i < jsonObj.length; i ++){
            if(this.validateEmail(jsonObj[i].Email) == false || isNaN(jsonObj[i].Distance) == true)
                return false
        }
        return true
    }
    
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/distance/club/styles.css>

            <div id="mainPos" class="mainPos">
                <div style="margin-left:2%">
                    <h1>Enter Your Distance</h1>
                    <h3>This is how the Excel should look like (.xlsx Format):</h3>
                    <table class="table table-dark" style="width:400px">
                        <thead width="300" class="thead-dark">
                            <tr>
                                <th></th>
                                <th>A</th>
                                <th>B</th>
                            </tr>
                        </thead>
                        <tbody width="300">
                            <tr>
                                <td>1</td>
                                <td>Email</td>
                                <td>Distance</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>your.email@gmail.com</td>
                                <td>6789</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>another.email@gmx.at</td>
                                <td>7870</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Select Excel File</label>
                        <input id="excelFile" accept=".xlsx" type="file" class="form-control-file" id="exampleFormControlFile1">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary" @click="${() => this.postPeriods()}">Submit</button>
                    <p id="notification"></p>
                </div>
            </div>
        `
    }
}
window.customElements.define('distance-form-club', DistanceFormClub)