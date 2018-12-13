import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../rest/dataService.js'

export default class DistanceFormClub extends LitElement{
    
    static get properties(){
        return{
            uploaded: Boolean
        }
    }

    constructor(){
        super();
        this.uploaded = false
    }

    postPeriods(){
        var file = this.shadowRoot.getElementById('excelFile').files[0]
        var fileReader = new FileReader();
        if(this.distance == "" || this.shadowRoot.getElementById('excelFile').files[0] == undefined) {
            this.shadowRoot.getElementById('notification').innerHTML = 'no Excel selected'
            this.shadowRoot.getElementById('stepBackThree').style.display = 'initial'
            return
        }

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
                if(this.excelIsValid(XL_row_object) == false) {
                    this.shadowRoot.getElementById('notification').innerHTML = 'Excel data invalid'
                    this.shadowRoot.getElementById('stepBackThree').style.display = 'initial'
                }
                else {
                    DataService.postPeriods(jsonObj)
                    this.shadowRoot.getElementById('waiting').innerHTML = 'Your Excel File is successfully uploaded!'
                    this.shadowRoot.getElementById('notification').innerHTML = ''
                    this.uploaded = true
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

    activate(toActivate){
        if(!this.uploaded) {
            switch(toActivate){
                case '1':
                    this.shadowRoot.getElementById('excelFile').onchange = () => {this.setFileName()}
                    this.shadowRoot.getElementById('contentOne').style.display = 'initial'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'none'
                    break
                case '2':
                    this.shadowRoot.getElementById('contentOne').style.display = 'none'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'initial'
                    this.shadowRoot.getElementById('contentThree').style.display = 'none'
                    this.shadowRoot.getElementById('stepBackThree').style.display = 'none'
                    break
                case '3':
                    this.shadowRoot.getElementById('contentOne').style.display = 'none'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'initial'
                    this.postPeriods()
                break
            }
        }
    }
    setFileName(){
        this.shadowRoot.getElementById('excelNotification').innerHTML = this.shadowRoot.getElementById('excelFile').files[0].name
        this.shadowRoot.getElementById('doneTwo').disabled = false
    }

    render(){
        return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/distance/club/styles.css>

            <div style="margin-top:2%">
                <div style="margin-left:2%">
                    <div>
                        <p class="number-design" @click="${() => this.activate('1')}">1</p>
                        <h2 style="margin-top:-3%;margin-left:4%" @click="${() => this.activate('1')}"><strong>Check the structure</strong></h2>
                    </div>
                    <div class="horizontal-line"></div><br>
                    <div id="contentOne" style="display:none">
                        <br><h4><strong>This is how the Excel should look like (.xlsx File)</strong><h4>
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
                        <button type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('2')}">Got it!</button><br><br>
                    </div>

                    <div>
                        <p class="number-design">2</p>
                        <h2 style="margin-top:-3%;margin-left:4%"><strong>Select your File</strong></h2>
                    </div>
                    <div class="horizontal-line"></div><br>
                    <div id="contentTwo" style="display:none">
                        <div class="form-group">
                            <label class="btn btn-default btn-file">
                                Select Excel File <input id="excelFile" accept=".xlsx" class="form-control-file" type="file" style="display: none;">
                            </label>
                        </div>
                        <p id ="excelNotification"></p>
                        <div class="btn-group" role="group">
                            <button id="doneTwo" type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('3')}" disabled>Done</button>
                            <button type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('1')}">Step Back</button><br><br>
                        </div>
                    </div>
                    <div>
                    <div>
                        <p class="number-design">3</p>
                        <h2 style="margin-top:-3%;margin-left:4%"><strong>Upload to Server</strong></h2>
                    </div>
                    <div class="horizontal-line"></div><br>
                    <div id="contentThree" style="display:none">
                        <h3 id="waiting"><strong>Waiting ...</strong></h3>
                        <p id="notification"></p>
                        <button id="stepBackThree" style="display:none" type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('2')}">Step Back</button>
                    </div>
                </div>
            </div>
        `
    }
}
window.customElements.define('distance-form-club', DistanceFormClub)