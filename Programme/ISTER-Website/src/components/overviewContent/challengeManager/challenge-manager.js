import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js';

//Web Component for Menu Button "ChallengeManager"
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
            datePickerLoaded: Boolean,
            oldDistance: String,
            newDistance: String
        }
    }

    constructor(){
        super();
        this.entered = false
        this.datePickerLoaded = false
    }

    //get all past / current challenges incl date
    async getAllChallenges(){
        if(this.entered == false)
            this.challenges = await DataService.get('all-challenges')
        if(this.challenges != "failure"){
            var data = this.transformJson(this.challenges)
            this.doTableFill(data)
        }
        else
            window.alert('connection failed')
        
    }

    //fill table with challenge data
    doTableFill(data){
        var tableBody = this.shadowRoot.getElementById('manageBody')
        for(var i = 0; i < data.length; i ++){
            var tr = this.getTableContentRow(data[i])
            tableBody.appendChild(tr)
        }
    }

    //transform json in right format for table
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

    //create single challenge table row
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

    //called when date will get edited
    changeSessionDate(id, date){
        this.selectedValueId = id
        this.oldDate = date
        this.openPopup()
    }

    //set single row cell on click so that we know with date we have to change
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
    
    //open popup for edit
    openPopup(){
        this.shadowRoot.getElementById('popup-field').style.display = 'initial';
        if(!this.datePickerLoaded){
            this.loadDatePicker('popupInput', this.oldDate)
            this.datePickerLoaded = true
        }
    }

    //close popup
    closePopup(status){
        this.shadowRoot.getElementById('popup-field').style.display = 'none';
    
        //date should be saved
        if(status == 'save'){
            var newDate = this.shadowRoot.getElementById('popupInput').value

            //reset content of cell
            this.shadowRoot.getElementById(this.selectedValueId).innerHTML = this.getTdContent('enabled', this.selectedValueId, this.intToDate(newDate))
            
            //update session date at backend
            this.executeSessionPost(newDate)
        }
    }

    async executeSessionPost(newDate){
        let response = await DataService.post(JSON.stringify({"oldDate": this.oldDate, "newDate": newDate}), 'session-date-update')
        if(response == "success")
            window.alert('Datum wurde in der Datenbank geupdatet')
        else
            window.alert('Fehler beim hochladen')
    }

    //create single cell object
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

    //return html for single cell
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

    //delete challenge
    async deleteChallenge(id){
        var year = id.substring(0,4)
        if(window.confirm('Wollen Sie die Challenge vom Jahr ' + year + ' wirklich aus der Datenbank löschen?')){
            console.log('DataService delete hier auskommentiert')
            /*
            let response = await DataService.delete('delete-single-challenge', id)

            if(response == "success"){

                //stuff that the list on frontend is correct
                this.deleteSpecificChallengeFromList(year)
                this.shadowRoot.getElementById('manageBody').innerHTML = ''
                this.getAllChallenges()

                window.alert('Challenge von ' + year + ' gelöscht')
            }
            else
                window.alert('Fehler beim löschen')
            */
        }
    }

    //remove challenge from list
    deleteSpecificChallengeFromList(year){
        this.challenges = this.challenges.filter((value, index, arr) => {
            return value.year != year
        });
    }

    render(){
        $(document).ready(() => { 
            
            //since we recreate the document, this method would get called again and again
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

        <h2 class="header-border" @click="${() => this.changeStatus('changeDistance')}"><strong>Distanz ändern</strong></h2>
        <div id="changeDistance" style="display:none">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Email</strong></span>
                </div>
                <input id="emailDistance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Jahr</strong></span>
                </div>
                <input id="yearDistance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Session</strong></span>
                </div>
                <input id="sessionDistance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Alte Distanz</strong></span>
                </div>
                <input id="oldValueDistance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Neue Distanz</strong></span>
                </div>
                <input id="newValueDistance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <br>
            <button class="btn btn-primary custom-size" @click="${() => this.changeDistanceOnBackend()}">Ändern</button>
            <br>
            <p id="distanceNotification"></p>
        </div>  
        `
    }

    //method gets called from html, changes specific distance from participant
    changeDistanceOnBackend(){
        var errors = this.validateChangeDistanceInputParams()
        if(errors == ""){
            this.executeDistancePost()
            this.shadowRoot.getElementById('distanceNotification').innerHTML = ``
        }
        else
            this.shadowRoot.getElementById('distanceNotification').innerHTML = `<span class="error">${errors}</span>`
    }

    async executeDistancePost(){
        var response = await DataService.post(this.getUpdateDistanceJson(), 'change-distance')
        if(response == "success")
            window.alert('Distanz wurde geupdatet')
        else
            window.alert('Fehler beim hochladen')
        this.shadowRoot.getElementById('distanceNotification').innerHTML = ``
    }

    //check field values for change distance view
    validateChangeDistanceInputParams(){
        var errorString = ''
        this.email = this.shadowRoot.getElementById('emailDistance').value
        this.year = this.shadowRoot.getElementById('yearDistance').value
        this.session = this.shadowRoot.getElementById('sessionDistance').value
        this.oldDistance = this.shadowRoot.getElementById('oldValueDistance').value
        this.newDistance = this.shadowRoot.getElementById('newValueDistance').value

        if(this.validateEmail(this.email) == false)
            errorString += 'Ungültige Email; '
        if(isNaN(this.year) || this.year == "")
            errorString += 'Ungültiges Jahr; '
        if(isNaN(this.session) || this.session == "")
            errorString += 'Ungültige Session;'
        if(isNaN(this.session) || this.session == "")
            errorString += 'Ungültige alte Distanz;'
        if(isNaN(this.session) || this.session == "")
            errorString += 'Ungültige neue Distanz'
        return errorString
    }

    //returns json object for distance update
    getUpdateDistanceJson(){
        return JSON.parse('{"email":"' + this.shadowRoot.getElementById('emailDistance').value + '","year":"' + this.shadowRoot.getElementById('yearDistance').value + '","session":"' + this.shadowRoot.getElementById('sessionDistance').value + '","oldValue":"' + this.shadowRoot.getElementById('oldValueDistance').value + '","newValue":"' + this.shadowRoot.getElementById('newValueDistance').value + '"}')
    }

    //returns if given param-date is in the past
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

    //convert plain date to "viewable-date"
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

    //convert "viewable-date" to plain date
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

    //check if email is syntactic ok
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async executeChallengePut(){
        var response = await DataService.put(this.createMsgJson(), "challenge")

        if(response == "success")
            window.alert('Erfolgreich hochgeladen!')
        else
            window.alert('Fehler beim hochladen!')

        this.shadowRoot.getElementById('notification').innerHTML = ''
        this.uploaded = true
    }
    
    //create new challenge
    async createNewChallenge(){

        //all fields filled?
        if(this.allValuesSelected() == false)
            this.shadowRoot.getElementById('notification').innerHTML = '<span class="error">Nicht alle Werte wurden ausgefüllt<span>'
        else {
            this.executeChallengePut()
            
            //now we have to add it to the page AND check if we may update the existing but not started challenge (april to october)
            var usedIdex = 0
            var actualIndex = 0

            //filter for challenges with same year as just created
            var challenge = this.challenges.filter((value, index, arr) => {
                usedIdex = index
                return value.year == this.shadowRoot.getElementById('dropDown').value
            })

            //if we do find it, set the index at usedIndex so that we override the old challenge
            if(challenge[0] != undefined)
                actualIndex = usedIdex
            else //otherwise, we add it at the end of the list
                actualIndex = this.challenges.length

            //add new challenge to list
            this.challenges[actualIndex] = {
                "year": this.shadowRoot.getElementById('dropDown').value,
                "roundOne": this.shadowRoot.getElementById('roundOne').value,
                "roundTwo": this.shadowRoot.getElementById('roundTwo').value,
                "roundThree": this.shadowRoot.getElementById('roundThree').value,
                "roundFour": this.shadowRoot.getElementById('roundFour').value,
                "roundFive": this.shadowRoot.getElementById('roundFive').value,
                "roundSix": this.shadowRoot.getElementById('roundSix').value,
            }

            //clear challenge table and refill it
            this.clearCreatorContainer()
            this.shadowRoot.getElementById('manageBody').innerHTML = ''
            this.getAllChallenges()

            //window.alert('Challenge erstellt')
            
        }
    }

    //create json for 6 round dates
    createMsgJson(){
        return JSON.parse("{\"roundOne\":\"" + this.shadowRoot.getElementById('roundOne').value + "\",\"roundTwo\":\"" + this.shadowRoot.getElementById('roundTwo').value + "\",\"roundThree\":\"" + this.shadowRoot.getElementById('roundThree').value + "\",\"roundFour\":\"" + this.shadowRoot.getElementById('roundFour').value + "\",\"roundFive\":\"" + this.shadowRoot.getElementById('roundFive').value + "\",\"roundSix\":\"" + this.shadowRoot.getElementById('roundSix').value + "\",\"year\":\"" + this.shadowRoot.getElementById('dropDown').value + "\"}")
    }

    //returns if all fields have a valid value
    allValuesSelected(){
        return this.shadowRoot.getElementById('roundOne').value != "" && this.shadowRoot.getElementById('roundTwo').value != "" && this.shadowRoot.getElementById('roundThree').value != "" && this.shadowRoot.getElementById('roundFour').value != "" && this.shadowRoot.getElementById('roundFive').value != "" && this.shadowRoot.getElementById('roundSix').value != "" && this.shadowRoot.getElementById('dropDown').value != ""
    }

    //transforms input field to datepicker-field
    loadDatePicker(round, date){
        $(this.shadowRoot.getElementById(round)).Zebra_DatePicker({direction: 1, disabled_dates:['* * * 0,1,2,3,5,6']});
    }
 
    //set years in dropdown list
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

    //changes visibility status of single part (Challenges bearbeiten, Challenges erstellen, Beweisbild suchen, Distanz ändern)
    changeStatus(idToSet){
        var elem = this.shadowRoot.getElementById(idToSet)
        if(elem.style.display == 'none')
            this.shadowRoot.getElementById(idToSet).style.display = 'initial'
        else
            this.shadowRoot.getElementById(idToSet).style.display = 'none'
    }

    //check for valid input params
    validatePictureInputParams(){
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

    //search for evidence pic
    searchEvidencePic(){
        var errorString = this.validatePictureInputParams()
        //if all params valid, let's search, otherwise display error
        if(errorString == '')
            this.getSearch()
        else
            this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">' + errorString + '</span>'
    }

    //search for picture in backend
    async getSearch(){
        let data = await DataService.get('evidence-pic', JSON.parse('{"email":"' + this.email + '","year":"' + this.year + '","session":"' + this.session + '"}'))
        if(data != "failure") {
            //display not found if it's not found
            if(data.picture == "notFound")
                this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">Kein Beweisbild gefunden</span>'
            else{ //otherwise download the file and clear the container afterwars
                this.download(this.dataURItoBlob(data.picture), data.name + ".png")
                this.shadowRoot.getElementById('searchForEvidencePic').style.display = 'none'
                this.clearPictureContainer()
            }
        }
        else
            this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">Connection failed</span>'
    }

    //clear input fields
    clearPictureContainer(){
        this.shadowRoot.getElementById('email').value = ''
        this.shadowRoot.getElementById('year').value = ''
        this.shadowRoot.getElementById('session').value = ''
    }

    //clear challenge creation fields
    clearCreatorContainer(){
        this.shadowRoot.getElementById('roundOne').value = this.shadowRoot.getElementById('roundOne').defaultValue
        this.shadowRoot.getElementById('roundTwo').value = this.shadowRoot.getElementById('roundTwo').defaultValue
        this.shadowRoot.getElementById('roundThree').value = this.shadowRoot.getElementById('roundThree').defaultValue
        this.shadowRoot.getElementById('roundFour').value = this.shadowRoot.getElementById('roundFour').defaultValue
        this.shadowRoot.getElementById('roundFive').value = this.shadowRoot.getElementById('roundFive').defaultValue
        this.shadowRoot.getElementById('roundSix').value = this.shadowRoot.getElementById('roundSix').defaultValue
        this.shadowRoot.getElementById('notification').innerHTML = ''
    }

    //convert dataURI to blob
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

    //download the picture
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