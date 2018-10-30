import { LitElement, html, property } from "../../../../../node_modules/@polymer/lit-element/lit-element.js"; //import {LeBla} from '../../rest'

class DistanceFormParticipant extends LitElement {
  static get properties() {
    return {
      path: String,
      distance: Number,
      evidencePic: Number
    };
  }
  /*postPeriodTwo(){
      console.log('entered postPeriodTwo')
      this.distance = this.shadowRoot.getElementById('distance').value;
      this.evidencePic = this.shadowRoot.getElementById('evidencePic')
      this.shadowRoot.getElementById('evidencePic').getBase64;
      async() => {
          await fetch(this.path + 'post', {
          method: 'POST',
          body: JSON.stringify({"distance": this.distance, "img": this.evidencePic}),
          headers:{
            'Content-Type': 'application/json'
          }
          });
      }
  }*/


  postPeriod() {
    this.distance = this.shadowRoot.getElementById('distance').value; //this.evidencePic = this.shadowRoot.getElementById('evidencePic').value//.webkitRelativePath//.target//.value//.getBase64

    this.evidencePic = 6787656789876;
    /*this.shadowRoot.appendChild(this.shadowRoot.cre)
    var myClass = Java.type("../../rest/dataService")
    let myClass = new LeBla();
    myClass.post();
    let dataService = new DataService()
    dataService.get()
    */
    //var msgJson = "{\"distance\":" + this.distance + ",\"evidencePic\":\"" + this.evidencePic + "\"}";

    fetch(this.path + 'postPeriod', {
      method: "POST",
      body: msgJson,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  constructor() {
    super();
    this.path = 'http://localhost:8080/testclienttest/rs/sql/';
  } //zu späterer Zeit: Überprüfung ob gerade eine Challenge!


  render() {
    return html`
            <!--bootstrap-->
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/bootstrap/dist/css/bootstrap.min.css"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/distance/club/styles.css">
                <!--<div style="margin-top:80%">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div>
                </div>-->
            <div class="mainPos">
                <h1>Enter Your Distance</h1>




                <input id="distance" type="text" placeholder="Enter Distance"/><br><br>
                <input id="evidencePic" type="file" name="Beweisbild auswählen" accept=".png, .jpg, .jpeg"/></br><br>
                <button type="submit" class="btn btn-primary" @click="${() => this.postPeriod()}">Submit</button>
            </div>
        `;
  }

}

window.customElements.define('distance-form-participant', DistanceFormParticipant);