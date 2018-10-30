import { LitElement, html } from "../../../../node_modules/@polymer/lit-element/lit-element.js";

class ChallengeCreator extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  createNewChallenge() {
    console.log('entered createNewChallenge');
  }

  loadDatePicker() {
    console.log('entered datePicker');
    console.log(this.shadowRoot.getElementById('roundOne')); //const picker = datepicker(this.shadowRoot.getElementById('roundOne'));

    /*this.shadowRoot.getElementById('roundOne').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    });*/
    //$( "#datepicker" ).datepicker();

    const picker = datepicker(this.shadowRoot.getElementById('roundOne'), {
      dateSelected: new Date(2099, 0, 5)
    });
  }

  render() {
    return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/challengeCreator/styles.css>
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
        `;
  }

}

window.customElements.define('challenge-creator', ChallengeCreator);