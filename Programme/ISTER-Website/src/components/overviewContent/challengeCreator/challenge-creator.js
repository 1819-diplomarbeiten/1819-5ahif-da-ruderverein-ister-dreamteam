import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../rest/dataService';

export default class ChallengeCreator extends LitElement{

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
        $(this.shadowRoot.getElementById(round)).Zebra_DatePicker({direction: 1});
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

    render(){
        $(document).ready(() => { 
            this.setYears()
            this.loadDatePicker('roundOne')
            this.loadDatePicker('roundTwo')
            this.loadDatePicker('roundThree')
            this.loadDatePicker('roundFour')
            this.loadDatePicker('roundFive')
            this.loadDatePicker('roundSix')
        }) 
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/challengeCreator/styles.css>
        <div class="mainPos">
            <h1 style="margin-left:2%">Create a new Challenge</h1><br>
            <div class="form-group" style="margin-left:2%">
                <p>Year</p>
                <select id="dropDown" style="width:250px" class="form-control">
                </select>
            </div>
            <div>
                <div class="datePickPositionOne">
                    <div class="form-group">
                        <p for="roundOne">Date of Round 1</p>
                        <input class="form-control-text "id="roundOne" style="width:160px;text-align:right">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundFour">Date of Round 4</p>
                        <input class="form-control-text "id="roundFour" style="width:160px;text-align:right">
                    </div>
                </div>
                <div class="datePickPositionTwo">
                    <div class="form-group">
                        <p for="roundTwo">Date of Round 2</p>
                        <input class="form-control-text "id="roundTwo" style="width:160px;text-align:right">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundFive">Date of Round 5</p>
                        <input class="form-control-text "id="roundFive" style="width:160px;text-align:right">
                    </div>

                </div>
                <div class="datePickPositionThree">
                    <div class="form-group">
                        <p for="roundThree">Date of Round 3</p>
                        <input class="form-control-text "id="roundThree" style="width:160px;text-align:right">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundSix">Date of Round 6</p>
                        <input class="form-control-text "id="roundSix" style="width:160px;text-align:right">
                    </div>
                </div>
            </div>
            <br>
            <div style="left:2%;position:fixed;margin-top:10%">
                <input type ="button" value="Create Challenge" class="btn btn-primary" @click="${() => this.createNewChallenge()}"></input>
                <p id="notification"></p>
            </div>
        </div>
        `
    }
}
window.customElements.define('challenge-creator', ChallengeCreator)