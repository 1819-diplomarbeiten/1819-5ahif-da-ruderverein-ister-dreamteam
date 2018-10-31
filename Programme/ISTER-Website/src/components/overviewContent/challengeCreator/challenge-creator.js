import {LitElement, html} from '@polymer/lit-element'

class ChallengeCreator extends LitElement{
    static get properties(){
        return {
            path: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/'
    }

    createNewChallenge(){
        var datepicker = this.shadowRoot.getElementById('roundOne').value
        console.log(datepicker);

        var msgJson = "{\"roundOne\":\"" + this.shadowRoot.getElementById('roundOne').value + "\",\"roundTwo\":\"" + this.shadowRoot.getElementById('roundTwo').value + "\",\"roundThree\":\"" + this.shadowRoot.getElementById('roundThree').value + "\",\"roundFour\":\"" + this.shadowRoot.getElementById('roundFour').value + "\",\"roundFive\":\"" + this.shadowRoot.getElementById('roundFive').value + "\",\"roundSix\":\"" + this.shadowRoot.getElementById('roundSix').value + "\",\"year\":\"" + this.shadowRoot.getElementById('dropDown').value + "\"}";
        fetch(this.path + 'postChallenge',
        {
            method: "POST",
            body: msgJson,
            headers: {
                "Content-Type": "application/json"
            }
        })
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
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/challengeCreator/styles.css>
        <div class="mainPos">
            <h1 style="margin-left:2%">Create a new Challenge</h1><br>
            <div class="form-group" style="margin-left:2%">
                <p>Year</p>
                <select id="dropDown" style="width:250px" class="form-control" @click="${() => this.setYears()}">
                </select>
            </div>
            <div>
                <div class="datePickPositionOne">
                    <div class="form-group">
                        <p for="roundOne">Date of Round 1</p>
                        <input class="form-control-text "id="roundOne" style="width:160px;text-align:right" @click="${() => this.loadDatePicker('roundOne')}">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundFour">Date of Round 4</p>
                        <input class="form-control-text "id="roundFour" style="width:160px;text-align:right" @click="${() => this.loadDatePicker('roundFour')}">
                    </div>
                </div>
                <div class="datePickPositionOther">
                    <div class="form-group">
                        <p for="roundTwo">Date of Round 2</p>
                        <input class="form-control-text "id="roundTwo" style="width:160px;text-align:right" @click="${() => this.loadDatePicker('roundTwo')}">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundFive">Date of Round 5</p>
                        <input class="form-control-text "id="roundFive" style="width:160px;text-align:right" @click="${() => this.loadDatePicker('roundFive')}">
                    </div>

                </div>
                <div class="datePickPositionOther">
                    <div class="form-group">
                        <p for="roundThree">Date of Round 3</p>
                        <input class="form-control-text "id="roundThree" style="width:160px;text-align:right" @click="${() => this.loadDatePicker('roundThree')}">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundSix">Date of Round 6</p>
                        <input class="form-control-text "id="roundSix" style="width:160px;text-align:right" @click="${() => this.loadDatePicker('roundSix')}">
                    </div>
                </div>
            </div>
            <br>
            <input style="margin-top:10%;margin-left:-47%" type ="button" style="width:160px;text-align:right" value="Create Challenge" class="btn btn-primary" @click="${() => this.createNewChallenge()}"></input>
        </div>
        `
    }
}
window.customElements.define('challenge-creator', ChallengeCreator)