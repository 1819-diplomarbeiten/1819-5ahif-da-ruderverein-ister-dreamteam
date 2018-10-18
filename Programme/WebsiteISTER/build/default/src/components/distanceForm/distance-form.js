import { LitElement, html, property } from "../../../node_modules/@polymer/lit-element/lit-element.js";

class DistanceForm extends LitElement {
  static get properties() {
    return {
      path: String,
      distance: Number,
      evidencePic: Image
    };
  }

  postPeriodTwo() {
    console.log('entered postPeriodTwo');
    this.distance = this.shadowRoot.getElementById('distance').value;
    this.evidencePic = this.shadowRoot.getElementById('evidencePic');
    this.shadowRoot.getElementById('evidencePic').getBase64;

    async () => {
      await fetch(this.path + 'post', {
        method: 'POST',
        body: JSON.stringify({
          "distance": this.distance,
          "img": this.evidencePic
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };
  }

  postPeriod() {
    console.log('entered postPeriod');
    this.distance = this.shadowRoot.getElementById('distance').value;
    this.evidencePic = this.shadowRoot.getElementById('evidencePic').getBase64;
    console.log(this.distance);
    /* (async() => {
         console.log('entered async')
       const response = await fetch(this.path + 'postMethod', {
         method: 'POST',
         //credentials: 'include',
         cache: 'no-cache',
         mode:'cors',
         body: JSON.stringify({"distance": this.distance, "img": this.evidencePic}),
         headers:{
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
       });
       const myJson = await response.json();
     })();*/

    var jsonObj = {
      "distance": this.distance,
      "evidencePic": this.evidencePic
    };
    var data = new FormData();
    data.append("json", JSON.stringify(jsonObj));
    fetch(this.path + "postMethod", {
      method: "POST",
      body: JSON.stringify({
        "distance": this.distance,
        "img": this.evidencePic
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => console.log(res));
    /*.then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })*/
  }

  constructor() {
    super();
    this.path = 'http://localhost:8080/testclienttest/rs/sql/';
  } //zu späterer Zeit: Überprüfung ob gerade eine Challenge!


  render() {
    return html`
            <link rel="stylesheet" type="text/css" href=/src/components/distanceForm/styles.css>
            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <input id="distance" type="text" placeholder="Enter Distance" value="1234"/><br><br>
                <input id="evidencePic" type="file" name="Beweisbild auswählen" accept=".png, .jpg, .jpeg"/></br><br>
                <button type="submit" @click="${() => this.postPeriod()}">Submit</button>
            </div>
        `;
  }

}

window.customElements.define('distance-form', DistanceForm);