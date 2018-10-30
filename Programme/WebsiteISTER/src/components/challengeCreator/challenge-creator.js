import {LitElement, html} from '@polymer/lit-element'

class ChallengeCreator extends LitElement{
    static get properties(){
        return {

        }
    }
    constructor(){
        super();
    }

    createNewChallenge(){
        console.log('entered createNewChallenge')
    }

    loadDatePicker(){
        console.log('entered datePicker')
        console.log(this.shadowRoot.getElementById('roundOne'))
        const picker = datepicker(this.shadowRoot.getElementById('roundOne'));
    }

    render(){
        return html`
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script rel="stylesheet" href="/node_modules/js-datepicker/datepicker.css"></script>
        <script src="/node_modules/js-datepicker/datepicker.min.js"></script> 
        <link rel="stylesheet" type="text/css" href=/src/components/challengeCreator/styles.css>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <div class="mainPos">
            <h1>Create a new Challenge</h1><br>
            <h2>(Dieses Ding schlussendlich nur für Hr. Schramm zugänglich)</h2>
            <input id="roundOne" @click="${() => this.loadDatePicker()}">
            <div class="dropdown">
                <form>
                    <div class="form-group">
                        <p>Year</p>
                        <input id="year" type="text" placeholder="year start">
                    </div>
                    <br>
                    <div class="form-group">
                        <p>1. Session</p>
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
            <input type ="button" value="Create Challenge" class="btn btn-primary" @click="${() => this.createNewChallenge()}"></input>
        </div>
        `
    }
}
window.customElements.define('challenge-creator', ChallengeCreator)