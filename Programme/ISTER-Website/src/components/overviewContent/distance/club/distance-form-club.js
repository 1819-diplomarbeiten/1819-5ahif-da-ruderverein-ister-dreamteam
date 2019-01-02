import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../services/rest/dataService.js'
import TranslationService from '../../../../services/translation/translationService.js'

export default class DistanceFormClub extends LitElement{
    
    static get properties(){
        return{
            uploaded: Boolean,
            translation: []
        }
    }

    constructor(){
        super();
        this.uploaded = false
        this.translation = TranslationService.getTranslation('club-distance')
    }

    //manages excel upload per service
    manageUpload(){
        var file = this.shadowRoot.getElementById('excelFile').files[0]
        var fileReader = new FileReader();

        fileReader.onload = e => {
            this.checkExcel(e)
        }

        fileReader.readAsArrayBuffer(file)
    }

    //parses excel file
    checkExcel(e){
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
                this.shadowRoot.getElementById('notification').innerHTML = `${this.translation["distanceClubErrorThree"]}`
                this.shadowRoot.getElementById('stepBackThree').style.display = 'initial'
            }
            else {
                DataService.post(jsonObj, "periods")
                this.shadowRoot.getElementById('waiting').innerHTML = `${this.translation["distanceClubSuccessThree"]}!`
                this.shadowRoot.getElementById('notification').innerHTML = ''
                this.uploaded = true
            }
        })
    }

    //checks the structure of the excel (header, valid distance, valid email)
    excelIsValid(jsonObj){
        //Header name check
        if(jsonObj[0].Distance == undefined || jsonObj[0].Email == undefined){
            return false
        }

        //content check
        for(var i = 0; i < jsonObj.length; i ++){
            if(this.validateEmail(jsonObj[i].Email) == false || isNaN(jsonObj[i].Distance) == true || jsonObj[i].Distance == "")
                return false
        }

        return true
    }
    
    //checks if a email's structure is correct
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //handles displaying of the different parts
    activate(toActivate){
        if(!this.uploaded) {
            switch(toActivate){
                case '1':
                    this.shadowRoot.getElementById('contentOne').style.display = 'initial'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'none'
                    break
                case '2':
                    this.shadowRoot.getElementById('excelFile').value = null
                    this.shadowRoot.getElementById('excelFile').onchange = () => {this.setFileName()}
                    this.shadowRoot.getElementById('contentOne').style.display = 'none'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'initial'
                    this.shadowRoot.getElementById('contentThree').style.display = 'none'
                    this.shadowRoot.getElementById('stepBackThree').style.display = 'none'
                    this.shadowRoot.getElementById('excelNotification').innerHTML = ''
                    this.shadowRoot.getElementById('doneTwo').disabled = true
                    break
                case '3':
                    this.shadowRoot.getElementById('contentOne').style.display = 'none'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'initial'
                    this.manageUpload()
                break
            }
        }
    }
    
    //displays filename beneath selection button
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
            <br>
            <div>
                <p class="number-design" @click="${() => this.activate('1')}">1</p>
                <h2 style="margin-top:-3%;margin-left:4%" @click="${() => this.activate('1')}"><strong>${this.translation["distanceClubHeadlineOne"]}</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentOne">
                <br><h4><strong>${this.translation["distanceClubSubheadlineOne"]}</strong><h4>
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
                <button type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('2')}">${this.translation["distanceClubSubmitOne"]}</button><br><br>
            </div>
            <div>
                <p class="number-design">2</p>
                <h2 style="margin-top:-3%;margin-left:4%"><strong>${this.translation["distanceClubHeadlineTwo"]}</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentTwo" style="display:none">
                <div class="form-group">
                    <label class="btn btn-default btn-file">
                        ${this.translation["distanceClubSelectTwo"]} <input id="excelFile" accept=".xlsx" class="form-control-file" type="file" style="display:none">
                    </label>
                </div>
                <p id ="excelNotification"></p>
                <div class="btn-group" role="group">
                    <button id="doneTwo" type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('3')}" disabled>${this.translation["distanceSubmitBtn"]}</button>
                    <button type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('1')}">${this.translation["distanceBackBtn"]}</button><br><br>
                </div>
            </div>
            <div>
            <div>
                <p class="number-design">3</p>
                <h2 style="margin-top:-3%;margin-left:4%"><strong>${this.translation["distanceHeadlineThree"]}</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentThree" style="display:none">
                <h3 id="waiting"><strong>Waiting ...</strong></h3>
                <p id="notification"></p>
                <button id="stepBackThree" style="display:none" type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('2')}">${this.translation["distanceBackBtn"]}</button>
            </div>
        `
    }
}
window.customElements.define('distance-form-club', DistanceFormClub)