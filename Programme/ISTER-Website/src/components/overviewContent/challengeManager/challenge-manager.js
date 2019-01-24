import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js';

export default class ChallengeManager extends LitElement{
    static get properties(){
        return{
            challenges: {
                type: Array
            },
            email: String,
            year: String,
            session: String,
            selectedValueId: String,
            oldDate: String,
            entered: Boolean,
            datePickerLoaded: Boolean
        }
    }

    constructor(){
        super();
        this.entered = false
        this.datePickerLoaded = false
    }

    getAllChallenges(){
        if(this.entered == false)
            this.challenges = DataService.get('all-challenges')
        if(this.challenges != "failure"){
            var data = this.transformJson(this.challenges)
            this.doTableFill(data)
        }
        else
            console.log('connection failed')
        
    }


    doTableFill(data){
        var tableBody = this.shadowRoot.getElementById('manageBody')
        for(var i = 0; i < data.length; i ++){
            var tr = this.getTableContentRow(data[i])
            tableBody.appendChild(tr)
        }
    }

    transformJson(data){
        var newData = []
        for(var i = 0; i < data.length; i ++){
            newData[i] = {
                year: data[i].year,
                roundOne: this.intToDate(data[i].roundOne),
                roundTwo: this.intToDate(data[i].roundTwo),
                roundThree: this.intToDate(data[i].roundThree),
                roundFour: this.intToDate(data[i].roundFour),
                roundFive: this.intToDate(data[i].roundFive),
                roundSix: this.intToDate(data[i].roundSix)
            }
        }
        return newData
    }

    getTableContentRow(data){
        var tr = document.createElement('tr')
        tr.appendChild(this.createTdObject(data.year))
        tr.appendChild(this.createTdObject(data.roundOne, data.year + 'roundOne'))
        tr.appendChild(this.createTdObject(data.roundTwo, data.year + 'roundTwo'))
        tr.appendChild(this.createTdObject(data.roundThree, data.year + 'roundThree'))
        tr.appendChild(this.createTdObject(data.roundFour, data.year + 'roundFour'))
        tr.appendChild(this.createTdObject(data.roundFive, data.year + 'roundFive'))
        tr.appendChild(this.createTdObject(data.roundSix, data.year + 'roundSix'))
        tr.appendChild(this.createTdObject('delete', data.year + 'delete'))
        return tr
    }

    changeSessionDate(id, date){
        this.selectedValueId = id
        this.oldDate = date
        this.openPopup()
    }

    setIdOnClick(id, mode, date){
        var x = setInterval(_ => {
            var elem = this.shadowRoot.getElementById(id)
            if(elem != null){
                elem.onclick = () => {
                    if(mode == 'delete')
                        this.deleteChallenge(id)
                    else if(mode == 'change')
                        this.changeSessionDate(id, date)
                    else
                        console.log('ERROR at click-listener')
                }
                clearInterval(x)
            }
        }, 10);
    }
    
    openPopup(){
        this.shadowRoot.getElementById('popup-field').style.display = 'initial';
        if(!this.datePickerLoaded){
            this.loadDatePicker('popupInput', this.oldDate)
            this.datePickerLoaded = true
        }
    }

    closePopup(status){
        this.shadowRoot.getElementById('popup-field').style.display = 'none';
        if(status == 'save'){
            var newDate = this.shadowRoot.getElementById('popupInput').value
            this.shadowRoot.getElementById(this.selectedValueId).innerHTML = this.getTdContent('enabled', this.selectedValueId, this.intToDate(newDate))
            var json = JSON.stringify({"oldDate": this.oldDate, "newDate": newDate})
            DataService.put(json, 'session-date-update')
            window.alert('Datum wurde in der Datenbank geupdatet')
        }
    }

    createTdObject(date, id){
        var td = document.createElement('td')
        td.setAttribute('id', id)
        if(isNaN(date)){
            if(date == 'delete')
                td.innerHTML = this.getTdContent('delete', id, date)
            else if(this.dateIsInPast(this.dateToInt(date)))
                td.innerHTML = this.getTdContent('disabled', null, date)
            else
                td.innerHTML = this.getTdContent('enabled', id, date)
        }
        else {
            td.innerHTML = date
            td.style.marginTop = ''
        }
        return td
    }

    getTdContent(mode, id, date){
        var content = ''
        switch(mode){
            case "delete":
                content = '<button class="btn btn-danger">Challenge löschen</button>'
                this.setIdOnClick(id, 'delete')
                break;
            case "disabled":
                content = date + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button align='right' class='btn btn-primary custom-color' disabled>Ändern</button>"
                break
            case "enabled":
                content = date + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button align='right' class='btn btn-primary custom-color'>Ändern</button>"
                this.setIdOnClick(id, 'change', this.dateToInt(date))
                break
            default:
                console.log("ERROR")
                break
        }
        return content
    }

    deleteChallenge(id){
        var year = id.substring(0,4)
        if(window.confirm('Wollen Sie die Challenge vom Jahr ' + year + ' wirklich aus der Datenbank löschen?')){
            window.alert('Challenge von ' + year + ' gelöscht')
            console.log('DataService delete hier auskommentiert')
            //DataService.delete('delete-single-challenge', id)
            this.deleteSpecificChallengeFromList(year)
            this.shadowRoot.getElementById('manageBody').innerHTML = ''
            this.getAllChallenges()
        }
    }

    deleteSpecificChallengeFromList(year){
        this.challenges = this.challenges.filter((value, index, arr) => {
            return value.year != year
        });
    }

    render(){
        $(document).ready(() => { 
            if(this.entered == false){
                this.setYears()
                this.loadDatePicker('roundOne')
                this.loadDatePicker('roundTwo')
                this.loadDatePicker('roundThree')
                this.loadDatePicker('roundFour')
                this.loadDatePicker('roundFive')
                this.loadDatePicker('roundSix')
                this.getAllChallenges()
                this.entered = true
            }
        })

        return html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/challengeManager/styles.css>
        <script lang="javascript" src="/node_modules/file-saver/dist/FileSaver.js"></script>
        <h2 id="manageChallenge" class="header-border" @click="${() => this.changeStatus('manageTable')}"><strong>Challenges bearbeiten</strong></h2>
        <div id="manageDiv">
            <div id="popup-field" class="popup-field">
                <span class="helper"></span>
                <div>
                    <div class="form-group">
                        <p for="popupInput">Neues Datum eingeben</p>
                        <input class="form-control-text" id="popupInput" style="width:160px;text-align:right">
                    </div>
                    <br><br>
                    <div class="btn-group" role="group">
                        <button id="doneTwo" type="submit" class="btn btn-primary custom-color" @click="${() => this.closePopup('save')}">Änderung speichern</button>
                        <button type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.closePopup('abort')}">Abbrechen</button>
                    </div>
                </div>
            </div>
            
            <table id="manageTable" class="table table-bordered table-validate" style="display:none">
                <thead>
                    <tr>
                        <th>Jahr</th>
                        <th>Runde 1</th>
                        <th>Runde 2</th>
                        <th>Runde 3</th>
                        <th>Runde 4</th>
                        <th>Runde 5</th>
                        <th>Runde 6</th>
                    </tr>
                </thead>
                <tbody id="manageBody">
                </tbody>
            </table>
        </div>

        <h2 id="createChallenge" class="header-border" @click="${() => this.changeStatus('createEnvironment')}"><strong>Challenge erstellen</strong></h2>
        <div id="createEnvironment" style="display:none">
            <div class="form-group">
                <p>Year</p>
                <select id="dropDown" style="width:250px" class="form-control">
                </select>
            </div>
            <div class="datePickPositionOne">
                <div class="form-group">
                    <p for="roundOne">Datum von Runde 1</p>
                    <input class="form-control-text "id="roundOne" style="width:80px;text-align:right">
                </div>
                <br>
                <div class="form-group">
                    <p for="roundFour">Datum von Runde 4</p>
                    <input class="form-control-text "id="roundFour" style="width:80px;text-align:right">
                </div>
            </div>
            <div class="datePickPositionTwoThree">
                <div class="form-group">
                    <p for="roundTwo">Datum von Runde 2</p>
                    <input class="form-control-text "id="roundTwo" style="width:80px;text-align:right">
                </div>
                <br>
                <div class="form-group">
                    <p for="roundFive">Datum von Runde 5</p>
                    <input class="form-control-text "id="roundFive" style="width:80px;text-align:right">
                </div>
            </div>
            <div class="datePickPositionTwoThree">
                <div class="form-group">
                    <p for="roundThree">Datum von Runde 3</p>
                    <input class="form-control-text "id="roundThree" style="width:80px;text-align:right">
                </div>
                <br>
                <div class="form-group">
                    <p for="roundSix">Datum von Runde 6</p>
                    <input class="form-control-text" id="roundSix" style="width:80px;text-align:right">
                </div>
            </div>
            <br>
            <div class="createBtn">
                <input type ="button" value="Challenge erstellen" class="btn btn-primary custom-size" @click="${() => this.createNewChallenge()}"></input>
                <p id="notification"></p>
            </div>
        </div>

        <h2 class="header-border" @click="${() => this.changeStatus('searchForEvidencePic')}"><strong>Beweisbild suchen</strong></h2>
        <div id="searchForEvidencePic" style="display:none">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Email</strong></span>
                </div>
                <input id="email" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Jahr</strong></span>
                </div>
                <input id="year" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Session</strong></span>
                </div>
                <input id="session" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <button class="btn btn-primary custom-size" @click="${() => this.searchEvidencePic()}">Suchen</button>
            <p id="PicNotification"></p>
        </div>  
        `
    }

    dateIsInPast(date){
        var today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var toCheck = date.split('-')
        
        if(parseInt(yyyy) > parseInt(toCheck[0])){
            return true
        }
        else if(parseInt(yyyy) < parseInt(toCheck[0])){
            return false
        }
        else {
            if(parseInt(mm) > parseInt(toCheck[1])){
                return true
            }
            else if(parseInt(mm) < parseInt(toCheck[1])){
                return false
            }
            else {
                if(parseInt(dd) > parseInt(toCheck[2])){
                    return true
                }
                else{
                    return false
                }
            }
        }
    }

    intToDate(date){
        var temp = date.split('-')

        switch(parseInt(temp[1])){
            case 1:
                return temp[2] + '. Jan ' +  temp[0]
            case 2:
                return temp[2] + '. Feb ' +  temp[0]
            case 3:
                return temp[2] + '. Mär ' +  temp[0]
            case 4:
                return temp[2] + '. Apr ' +  temp[0]
            case 5:
                return temp[2] + '. Mai ' +  temp[0] 
            case 6:
                return temp[2] + '. Jun ' +  temp[0]
            case 7:
                return temp[2] + '. Jul ' +  temp[0]
            case 8:
                return temp[2] + '. Aug ' +  temp[0]
            case 9:
                return temp[2] + '. Sep ' +  temp[0]
            case 10:
                return temp[2] + '. Okt ' +  temp[0]
            case 11:
                return temp[2] + '. Nov ' +  temp[0]
            case 12:
                return temp[2] + '. Dez ' +  temp[0]
            default:
                return 'ERROR'
        }
    }

    dateToInt(date){
        var temp = date.split(' ')
        temp[0] = temp[0].replace('.', '')
        switch(temp[1]){
            case 'Jan':
                return temp[2] + '-01-' +  temp[0]
            case 'Feb':
                return temp[2] + '-02-' +  temp[0]
            case 'Mär':
                return temp[2] + '-03-' +  temp[0]
            case 'Apr':
                return temp[2] + '-04-' +  temp[0]
            case 'Mai':
                return temp[2] + '-05-' +  temp[0] 
            case 'Jun':
                return temp[2] + '-06-' +  temp[0]
            case 'Jul':
                return temp[2] + '-07-' +  temp[0]
            case 'Aug':
                return temp[2] + '-08-' +  temp[0]
            case 'Sep':
                return temp[2] + '-09-' +  temp[0]
            case 'Okt':
                return temp[2] + '-10-' +  temp[0]
            case 'Nov':
                return temp[2] + '-11-' +  temp[0]
            default:
                return temp[2] + '-12-' +  temp[0]
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    createNewChallenge(){
        if(this.allValuesSelected() == false)
            this.shadowRoot.getElementById('notification').innerHTML = '<span class="error">Nicht alle Werte wurden ausgefüllt<span>'
        else {
            this.shadowRoot.getElementById('notification').innerHTML = ''
            DataService.post(this.createMsgJson(), "challenge")

            var usedIdex = 0
            var actualIndex = 0
            var challenge = this.challenges.filter((value, index, arr) => {
                usedIdex = index
                return value.year == this.shadowRoot.getElementById('dropDown').value
            })
            if(challenge[0] != undefined)
                actualIndex = usedIdex
            else
                actualIndex = this.challenges.length

            this.challenges[actualIndex] = {
                "year": this.shadowRoot.getElementById('dropDown').value,
                "roundOne": this.shadowRoot.getElementById('roundOne').value,
                "roundTwo": this.shadowRoot.getElementById('roundTwo').value,
                "roundThree": this.shadowRoot.getElementById('roundThree').value,
                "roundFour": this.shadowRoot.getElementById('roundFour').value,
                "roundFive": this.shadowRoot.getElementById('roundFive').value,
                "roundSix": this.shadowRoot.getElementById('roundSix').value,
            }
            this.clearCreatorContainer()
            this.shadowRoot.getElementById('manageBody').innerHTML = ''
            this.getAllChallenges()
            window.alert('Challenge erstellt')
        }
    }

    createMsgJson(){
        return JSON.parse("{\"roundOne\":\"" + this.shadowRoot.getElementById('roundOne').value + "\",\"roundTwo\":\"" + this.shadowRoot.getElementById('roundTwo').value + "\",\"roundThree\":\"" + this.shadowRoot.getElementById('roundThree').value + "\",\"roundFour\":\"" + this.shadowRoot.getElementById('roundFour').value + "\",\"roundFive\":\"" + this.shadowRoot.getElementById('roundFive').value + "\",\"roundSix\":\"" + this.shadowRoot.getElementById('roundSix').value + "\",\"year\":\"" + this.shadowRoot.getElementById('dropDown').value + "\"}")
    }

    allValuesSelected(){
        return this.shadowRoot.getElementById('roundOne').value != "" && this.shadowRoot.getElementById('roundTwo').value != "" && this.shadowRoot.getElementById('roundThree').value != "" && this.shadowRoot.getElementById('roundFour').value != "" && this.shadowRoot.getElementById('roundFive').value != "" && this.shadowRoot.getElementById('roundSix').value != "" && this.shadowRoot.getElementById('dropDown').value != ""
    }

    loadDatePicker(round, date){
        $(this.shadowRoot.getElementById(round)).Zebra_DatePicker({direction: 1, disabled_dates:['* * * 0,1,2,3,5,6']});
    }
 
    setYears(){
        if(this.shadowRoot.getElementById('dropDown').length == 0)
        {
            let startYear = new Date().getFullYear()
            let dropDown = this.shadowRoot.getElementById('dropDown')
            for(var i = startYear; i < startYear + 2;i++){
                let option = document.createElement('option')
                option.value = i
                option.innerHTML = i + " / " + (i+1)
                dropDown.appendChild(option)
            }
        }
    }

    changeStatus(idToSet){
        var elem = this.shadowRoot.getElementById(idToSet)
        if(elem.style.display == 'none')
            this.shadowRoot.getElementById(idToSet).style.display = 'initial'
        else
            this.shadowRoot.getElementById(idToSet).style.display = 'none'
    }

    validateInputParams(){
        var errorString = ''
        this.email = this.shadowRoot.getElementById('email').value
        this.year = this.shadowRoot.getElementById('year').value
        this.session = this.shadowRoot.getElementById('session').value
        if(this.validateEmail(this.email) == false)
            errorString += 'Ungültige Email; '
        if(isNaN(this.year) || this.year == "")
            errorString += 'Ungültiges Jahr; '
        if(isNaN(this.session) || this.session == "")
            errorString += 'Ungültige Session'
        return errorString
    }

    searchEvidencePic(){
        var errorString = this.validateInputParams()
        if(errorString == '')
            this.getSearch()
        else
            this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">' + errorString + '</span>'
    }

    getSearch(){
        var data = DataService.get('evidence-pic', JSON.parse('{"email":"' + this.email + '","year":"' + this.year + '","session":"' + this.session + '"}'))
        if(data != "failure") {
            if(data.picture == "notFound")
                this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">Kein Beweisbild gefunden</span>'
            else{
                this.download(this.dataURItoBlob(data.picture), data.name + ".png")
                this.shadowRoot.getElementById('searchForEvidencePic').style.display = 'none'
                this.clearPictureContainer()
            }
        }
        else
            this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">Connection failed</span>'
    }

    clearPictureContainer(){
        this.shadowRoot.getElementById('email').value = ''
        this.shadowRoot.getElementById('year').value = ''
        this.shadowRoot.getElementById('session').value = ''
    }

    clearCreatorContainer(){
        this.shadowRoot.getElementById('roundOne').value = this.shadowRoot.getElementById('roundOne').defaultValue
        this.shadowRoot.getElementById('roundTwo').value = this.shadowRoot.getElementById('roundTwo').defaultValue
        this.shadowRoot.getElementById('roundThree').value = this.shadowRoot.getElementById('roundThree').defaultValue
        this.shadowRoot.getElementById('roundFour').value = this.shadowRoot.getElementById('roundFour').defaultValue
        this.shadowRoot.getElementById('roundFive').value = this.shadowRoot.getElementById('roundFive').defaultValue
        this.shadowRoot.getElementById('roundSix').value = this.shadowRoot.getElementById('roundSix').defaultValue
        this.shadowRoot.getElementById('notification').innerHTML = ''
    }

    dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});
    }

    download(data, filename) {
        var file = new Blob([data]);
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

}
window.customElements.define('challenge-manager', ChallengeManager)