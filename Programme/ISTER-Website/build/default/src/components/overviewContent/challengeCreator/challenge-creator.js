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

  loadDatePicker(round) {
    console.log('entered datePicker at ' + round);
    $(this.shadowRoot.getElementById(round)).datepicker(); //const picker = datepicker(this.shadowRoot.getElementById(round))
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
            <div>
                <div class="datePickPosition">
                    <div class="form-group">
                        <p for="roundOne">Date of Round 1</p>
                        <input class="form-control-text "id="roundOne" @click="${() => this.loadDatePicker('roundOne')}">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundFour">Date of Round 4</p>
                        <input class="form-control-text "id="roundFour" @click="${() => this.loadDatePicker('roundFour')}">
                    </div>
                </div>
                <div class="datePickPosition">
                    <div class="form-group">
                        <p for="roundTwo">Date of Round 2</p>
                        <input class="form-control-text "id="roundTwo" @click="${() => this.loadDatePicker('roundTwo')}">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundFive">Date of Round 5</p>
                        <input class="form-control-text "id="roundFive" @click="${() => this.loadDatePicker('roundFive')}">
                    </div>

                </div>
                <div class="datePickPosition">
                    <div class="form-group">
                        <p for="roundThree">Date of Round 3</p>
                        <input class="form-control-text "id="roundThree" @click="${() => this.loadDatePicker('roundThree')}">
                    </div>
                    <br>
                    <div class="form-group">
                        <p for="roundSix">Date of Round 6</p>
                        <input class="form-control-text "id="roundSix" @click="${() => this.loadDatePicker('roundSix')}">
                    </div>
                </div>
            </div>
            <br>
            <input style="margin-top:3.5%;margin-left:5%" type ="button" value="Create Challenge" class="btn btn-primary" @click="${() => this.createNewChallenge()}"></input>
        </div>
        `;
  }

}

window.customElements.define('challenge-creator', ChallengeCreator);