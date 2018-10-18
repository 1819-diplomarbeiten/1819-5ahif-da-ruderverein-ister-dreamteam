import { LitElement, html } from "../../../node_modules/@polymer/lit-element/lit-element.js"; //import ''
//import 'jquery'

class PersonRanking extends LitElement {
  static get properties() {
    return {
      email: String,
      path: String,
      tableHeaders: Array
    };
  }

  constructor() {
    super();
    this.path = 'http://localhost:8080/testclienttest/rs/sql/';
    this.email = 'E Mail';
    this.tableHeaders = ['First Name', 'Last Name', 'Best Four', 'Round One', 'Round Two', 'Round Three', 'Round Four', 'Round Five', 'Round Six'];
  }

  createNewElement(elementType, content) {
    var temp = document.createElement(elementType);
    temp.innerText = content;
    return temp;
  }

  createNewRow(rowType, datas) {
    let t_tr = document.createElement('tr');

    if (rowType == 'th') {
      for (var j = 0; j < this.tableHeaders.length; j++) {
        t_tr.appendChild(this.createNewElement('th', this.tableHeaders[j]));
      }
    } else {
      t_tr.appendChild(this.createNewElement('td', datas.firstName));
      t_tr.appendChild(this.createNewElement('td', datas.lastName));
      t_tr.appendChild(this.createNewElement('td', datas.bestFourDistances));
      t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundOne));
      t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundTwo));
      t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundThree));
      t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundFour));
      t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundFive));
      t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundSix));
    }

    return t_tr;
  }

  allBestFourDistances() {
    let t_table = this.shadowRoot.getElementById('distanceTable');
    let t_thead = document.createElement('thead');
    let t_tbody = document.createElement('tbody');
    fetch(this.path + 'bestFourDistances', {
      method: 'GET',
      mode: 'no-cors'
    }).then(resp => resp.json()).then(data => {
      //Header Declaration
      t_thead.appendChild(this.createNewRow('th', null)); //Body Declaration

      for (var i = 0; i < data.length; i++) {
        t_tbody.appendChild(this.createNewRow('td', data[i]));
      }

      t_table.appendChild(t_thead);
      t_table.appendChild(t_tbody);
    }).catch(function (error) {
      console.log('Error loading data');
    });
  }

  pdf() {
    return html`
            <link rel="stylesheet" type="text/css" href="/src/components/personRanking/styles.css"></link>
            <div class="mainPos">
                <h1>30K Person Ranking List</h1>
                <h2>Select your choices and submit to downlaod pdf</h2>
                <paper-dropdown-menu label="Year">
                    <paper-listbox slot="dropdown-content">
                        <paper-item>2017/2018</paper-item>
                        <paper-item>2016/2017</paper-item>
                        <paper-item>2015/2016</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br>
                <paper-dropdown-menu label="Result">
                    <paper-listbox slot="dropdown-content">
                        <paper-item>Total</paper-item>
                        <paper-item>1st Session</paper-item>
                        <paper-item>2nd Session</paper-item>
                        <paper-item>3rd Session</paper-item>
                        <paper-item>4th Session</paper-item>
                        <paper-item>5th Session</paper-item>
                        <paper-item>6th Session</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br>
                <paper-dropdown-menu label="Sequence">
                    <paper-listbox slot="dropdown-content">
                        <paper-item>Alphabetic</paper-item>
                        <paper-item>TopDown</paper-item>
                        <paper-item>Categories</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br><br>
                <button>Download pdf</button>
            </div>
        `;
  }

  render() {
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
            <h1>30K Person Ranking List:</h1>
            <h2>Wählen Sie ihre gewünschten Filteroptionen</h2>
            <div class="dropdown">
                <select id="dropdownmenu" value="chose it man">
                    <option>Choose ...</option>
                    <option value='JavaVALUE' >JavaTEXT</option>
                    <option value='JavaScriptVALUE' >JavaScriptTEXT</option>
                    <option value='HTMLVALUE' >HTMLTEXT</option>
                    <option value='CSSVALUE' >CSSTEXT</option>
                    <option value='SQLVALUE' >SQLTEXT</option>
                    <option value='Database TutorialVALUE' >Database TutorialTEXT</option>
                    <option value='Web Hosting TutorialVALUE' >Web Hosting TutorialTEXT</option>
                </select>
			</div>
            <br>
            <input type ="button" value="click it" @click="${() => this.allBestFourDistances()}"></input>
        </div>
        `;
  }

}

window.customElements.define('person-ranking', PersonRanking);