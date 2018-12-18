import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../rest/dataService';

export default class ChallengeManager extends LitElement{
    static get properties(){
        return{
        }
    }

    constructor(){
        super();
    }

    createNewChallenge(){
        if(this.allValuesSelected() == false)
            this.shadowRoot.getElementById('notification').innerHTML = 'not all values selected'
        else {
            DataService.postChallenge(this.shadowRoot.getElementById('dropDown').value, this.shadowRoot.getElementById('roundOne').value, this.shadowRoot.getElementById('roundTwo').value, this.shadowRoot.getElementById('roundThree').value, this.shadowRoot.getElementById('roundFour').value, this.shadowRoot.getElementById('roundFive').value, this.shadowRoot.getElementById('roundSix').value)
            this.shadowRoot.getElementById('notification').innerHTML = 'Succesfully sent'
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
        var header =  new Array("Year", "Round One", "Round Two", "Runde Three", "Round Four", "Round Five", "Round Six")
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

    test(){
        console.log('entered test')
    }

    createSingleContentElement(content, msg){
        var content = document.createElement(content)
        if(isNaN(msg)){
            if(msg == 'cancel') {
                content.innerHTML = '<button class="btn btn-danger">Delete Challenge</button>'
            }
            else if(this.dateIsInPast(msg))
                content.innerHTML = msg + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button align='right' class='btn btn-primary custom-color' disabled>Edit</button>"
            else
                content.innerHTML = msg + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button align='right' class='btn btn-primary custom-color'>Edit</button>"
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
        }) 
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/challengeManager/styles.css>
        <div style="margin-left:2%">
            <h2 id="manageChallenge" class="header-border" @click="${() => this.changeStatus('manageTable')}"><strong>Manage the challenges</strong></h2>
            <div id="manageDiv">
                <table id="manageTable" class="table table-bordered table-validate" style="display:none">

                </table>
            </div>
            <!--<div style="margin-left:2%">-->
                <h2 id="createChallenge" class="header-border" @click="${() => this.changeStatus('createEnvironment')}"><strong>Create a new challenge</strong></h2>
                <div id="createEnvironment" style="display:none">
                    <div class="form-group">
                        <p>Year</p>
                        <select id="dropDown" style="width:250px" class="form-control">
                        </select>
                    </div>
                    <div class="datePickPositionOne">
                        <div class="form-group">
                            <p for="roundOne">Date of Round 1</p>
                            <input class="form-control-text "id="roundOne" style="width:80px;text-align:right">
                        </div>
                        <br>
                        <div class="form-group">
                            <p for="roundFour">Date of Round 4</p>
                            <input class="form-control-text "id="roundFour" style="width:80px;text-align:right">
                        </div>
                    </div>
                    <div class="datePickPositionTwoThree">
                        <div class="form-group">
                            <p for="roundTwo">Date of Round 2</p>
                            <input class="form-control-text "id="roundTwo" style="width:80px;text-align:right">
                        </div>
                        <br>
                        <div class="form-group">
                            <p for="roundFive">Date of Round 5</p>
                            <input class="form-control-text "id="roundFive" style="width:80px;text-align:right">
                        </div>
                    </div>
                    <div class="datePickPositionTwoThree">
                        <div class="form-group">
                            <p for="roundThree">Date of Round 3</p>
                            <input class="form-control-text "id="roundThree" style="width:80px;text-align:right">
                        </div>
                        <br>
                        <div class="form-group">
                            <p for="roundSix">Date of Round 6</p>
                            <input class="form-control-text" id="roundSix" style="width:80px;text-align:right">
                        </div>
                    </div>
                    <br>
                    <div style="left:2%;margin-top:10%">
                        <input type ="button" value="Create Challenge" class="btn btn-primary custom-size" @click="${() => this.createNewChallenge()}"></input>
                        <p id="notification"></p>
                    </div>
                </div>
            <!--</div>-->
        </div>
        `
    }
}
window.customElements.define('challenge-manager', ChallengeManager)