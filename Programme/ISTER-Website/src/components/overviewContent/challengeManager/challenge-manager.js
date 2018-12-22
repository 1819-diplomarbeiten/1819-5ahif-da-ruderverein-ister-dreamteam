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
            session: String
        }
    }

    constructor(){
        super();
    }

    createNewChallenge(){
        if(this.allValuesSelected() == false)
            this.shadowRoot.getElementById('notification').innerHTML = '<span class="error">Nicht alle Werte wurden ausgefüllt<span>'
        else {
            DataService.postChallenge(this.shadowRoot.getElementById('dropDown').value, this.shadowRoot.getElementById('roundOne').value, this.shadowRoot.getElementById('roundTwo').value, this.shadowRoot.getElementById('roundThree').value, this.shadowRoot.getElementById('roundFour').value, this.shadowRoot.getElementById('roundFive').value, this.shadowRoot.getElementById('roundSix').value)
            this.shadowRoot.getElementById('notification').innerHTML = 'Challenge erstellt'
        }
    }

    allValuesSelected(){
        return this.shadowRoot.getElementById('roundOne').value != "" && this.shadowRoot.getElementById('roundTwo').value != "" && this.shadowRoot.getElementById('roundThree').value != "" && this.shadowRoot.getElementById('roundFour').value != "" && this.shadowRoot.getElementById('roundFive').value != "" && this.shadowRoot.getElementById('roundSix').value != "" && this.shadowRoot.getElementById('dropDown').value != ""
    }

    loadDatePicker(round){
        $(this.shadowRoot.getElementById(round)).Zebra_DatePicker({direction: 1, disabled_dates:['* * * 0,1,2,3,5,6']});
    }

    setYears(){
        if(this.shadowRoot.getElementById('dropDown').length == 0)
        {
            let startYear = new Date().getFullYear()
            let dropDown = this.shadowRoot.getElementById('dropDown')
            for(var i = startYear; i < startYear + 3;i++){
                let option = document.createElement('option')
                option.value = i
                option.innerHTML = i + " / " + (i+1)
                dropDown.appendChild(option)
            }
        }
    }

    getTableHeader(){
        var header =  new Array("Jahr", "Runde 1", "Runde 2", "Runde 3", "Runde 4", "Runde 5", "Runde 6")
        var tableHeader = document.createElement('thead')
        var tableHeaderRow = document.createElement('tr')
        for(var i = 0; i < header.length;i++){
            var th = document.createElement('th')
            th.innerHTML = header[i]
            tableHeaderRow.appendChild(th)
        }
        tableHeader.appendChild(tableHeaderRow)
        return tableHeader
    }

    fillManageTable(){
        console.log('entered fillmanagetable')
        var temp;
        fetch('http://localhost/restApi/rest/getallchallenges.php', {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            var manageTable = this.shadowRoot.getElementById('manageTable')
            var tableHeader = this.getTableHeader()
            var tableBody = document.createElement('tbody')
            for(var i = 0; i < data.length; i ++){
                var tr = this.getTableContentRow(data[i])
                tableBody.appendChild(tr)
            }
            manageTable.appendChild(tableHeader)
            manageTable.appendChild(tableBody)
        })
    }

    getChallenges(){
        var temp;

        //return await fetch("http://localhost/restApi/rest/getallchallenges.php");

        
        fetch('http://localhost/restApi/rest/getallchallenges.php', {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            var newObj = []
            /*var manageTable = this.shadowRoot.getElementById('manageTable')
            var tableHeader = this.getTableHeader()
            var tableBody = document.createElement('tbody')
            for(var i = 0; i < data.length; i ++){
                var tr = this.getTableContentRow(data[i])
                tableBody.appendChild(tr)
            }
            manageTable.appendChild(tableHeader)
            manageTable.appendChild(tableBody)*/
            for(var i = 0; i < data.length; i ++){
                newObj[i] = {
                    year: data[i].year,
                    roundOne: this.transformDate(data[i].roundOne),
                    roundTwo: this.transformDate(data[i].roundTwo),
                    roundThree: this.transformDate(data[i].roundThree),
                    roundFour: this.transformDate(data[i].roundFour),
                    roundFive: this.transformDate(data[i].roundFive),
                    roundSix: this.transformDate(data[i].roundSix)
                }
            }
            console.log('newObj ' + newObj)
            temp = newObj;
            console.log('temp ' + temp)
        })
        console.log('temp2 ' + temp)
        return temp
    }

    transformDate(date){
        var temp = date.split('-')

        switch(parseInt(temp[1])){
            case 1:
                return temp[2] + '. Jänner ' +  temp[0]
                break
            case 2:
                return temp[2] + '. Februar ' +  temp[0]
                break
            case 3:
                return temp[2] + '. März ' +  temp[0]
                break
            case 4:
                return temp[2] + '. April ' +  temp[0]
                break
            case 5:
                return temp[2] + '. Mai ' +  temp[0]  
                break  
            case 6:
                return temp[2] + '. Juni ' +  temp[0]
                break
            case 7:
                return temp[2] + '. Juli ' +  temp[0]
                break
            case 8:
                return temp[2] + '. August ' +  temp[0]
                break
            case 9:
                return temp[2] + '. September ' +  temp[0]
                break
            case 10:
                return temp[2] + '. Oktober ' +  temp[0]
                break
            case 11:
                return temp[2] + '. November ' +  temp[0]
                break
            case 12:
                return temp[2] + '. Dezember ' +  temp[0]
                break
            default:
                return 'ERROR'
                break
        }
    }

    getTableContentRow(data){
        var tr = document.createElement('tr')
        tr.appendChild(this.createSingleContentElement('td', data.year))
        tr.appendChild(this.createSingleContentElement('td', data.roundOne))
        tr.appendChild(this.createSingleContentElement('td', data.roundTwo))
        tr.appendChild(this.createSingleContentElement('td', data.roundThree))
        tr.appendChild(this.createSingleContentElement('td', data.roundFour))
        tr.appendChild(this.createSingleContentElement('td', data.roundFive))
        tr.appendChild(this.createSingleContentElement('td', data.roundSix))
        tr.appendChild(this.createSingleContentElement('td', 'cancel'))
        return tr
    }

    createSingleContentElement(content, msg){
        var content = document.createElement(content)
        if(isNaN(msg)){
            if(msg == 'cancel') {
                content.innerHTML = '<button class="btn btn-danger">Challenge löschen</button>'
            }
            else if(this.dateIsInPast(msg))
                content.innerHTML = msg + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button align='right' class='btn btn-primary custom-color' disabled>Ändern</button>"
            else
                content.innerHTML = msg + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button align='right' class='btn btn-primary custom-color'>Ändern</button>"
        }
        else{
            content.innerHTML = msg
            content.style.marginTop = ''
        }
        return content
    }

    dateIsInPast(date){
        var today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var toCheck = date.split('-')

        if(parseInt(yyyy) > parseInt(toCheck[0]))
            return true
        else if(parseInt(yyyy) < parseInt(toCheck[0]))
            return false
        else {
            if(parseInt(mm) > parseInt(toCheck[1]))
                return false
            else if(parseInt(mm) < parseInt(toCheck[1]))
                return true
            else {
                if(parseInt(dd) > parseInt(toCheck[2]))
                    return true
                else
                    return false
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

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    getSearch(){
        fetch('http://localhost:8080/testserver/rs/sql/picSearch/' + this.email + '/' + this.year + '/' + this.session, {
            method: "GET"
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.picture == "notFound")
                this.shadowRoot.getElementById('PicNotification').innerHTML = '<span class="error">Kein Beweisbild gefunden</span>'
            else{
                this.download(this.dataURItoBlob(data.picture), data.name + ".png")
                this.shadowRoot.getElementById('searchForEvidencePic').style.display = 'none'
                this.clearPictureContainer()
            }
        })
    }

    clearPictureContainer(){
        this.shadowRoot.getElementById('email').value = ''
        this.shadowRoot.getElementById('year').value = ''
        this.shadowRoot.getElementById('session').value = ''
    }

    dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
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

    render(){
        $(document).ready(() => { 
            this.setYears()
            this.loadDatePicker('roundOne')
            this.loadDatePicker('roundTwo')
            this.loadDatePicker('roundThree')
            this.loadDatePicker('roundFour')
            this.loadDatePicker('roundFive')
            this.loadDatePicker('roundSix')
            this.fillManageTable()
            //${repeat(this.challenges, (item) => html``)}
        })/*
        ${repeat(this.challenges, (item) => html`
                            <tr>
                                <td>${item.year}</td>
                                <td>${item.roundOne}</td>
                                <td>${item.roundTwo}</td>
                                <td>${item.roundThree}</td>
                                <td>${item.roundFour}</td>
                                <td>${item.roundFive}</td>
                                <td>${item.roundSix}</td>
                            </tr>
                        `)}
         */
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/challengeManager/styles.css>
        <script lang="javascript" src="/node_modules/file-saver/dist/FileSaver.js"></script>
        <div style="margin-left:2%">

            <h2 id="manageChallenge" class="header-border" @click="${() => this.changeStatus('manageTable')}"><strong>Challenges bearbeiten</strong></h2>
            <div id="manageDiv">
                <table id="manageTable" class="table table-bordered table-validate" style="display:none">
                    <!--<thead>
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
                    <tbody>
                        
                    </tbody>-->
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
                <div style="left:2%;margin-top:10%">
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
        </div>
        `
    }
}
window.customElements.define('challenge-manager', ChallengeManager)