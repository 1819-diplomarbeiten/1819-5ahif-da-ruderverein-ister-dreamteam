import {LitElement, html} from '@polymer/lit-element'

class ClubRanking extends LitElement{
    static get properties(){
        return{

        }
    }

    constructor(){
        super();
    }

    pdf(){

    }

    render(){
        return html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <link rel="stylesheet" type="text/css" href=/src/components/personRanking/styles.css></link>

        <p>Table below:</p>
        <div class="mainPos">
            <!--<table id="tableId" class="table table-hover table-dark">
            </table>-->
            <br>
            <h1>30K Club Ranking List:</h1>
            <h2>Wählen Sie ihre gewünschten Filteroptionen</h2>
            <div class="dropdown">
                <form>
                    <div class="form-group">
                        <p>Year</p>
                        <select id="dropdownmenu" class="form-control">
                            <option value="2017">2017 / 2018</option>
                            <option value="2016">2016 / 2017</option>
                            <option value="2015">2015 / 2016</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>Result</p>
                        <select id="dropdownmenu" class="form-control">
                            <option value="total">Total</option>
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
                        <select id="dropdownmenu" class="form-control">
                            <option value="Alphabetic">Alphabetic</option>
                            <option value="TopDown">TopDown</option>
                        </select>
                    </div>
                </form>
			</div>
            <br>
            <input type ="button" value="Download pdf" class="btn btn-primary" @click="${() => this.pdf()}"></input>
        </div>
        `
    }
}
window.customElements.define('club-ranking', ClubRanking)