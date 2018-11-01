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
    var fileInput = this.shadowRoot.getElementById('evidencePic'); // files is a FileList object (similar to NodeList)

    var files = fileInput.files; // object for allowed media types

    var accept = {
      binary: ["image/png", "image/jpeg"],
      text: ["text/plain", "text/css", "application/xml", "text/html"]
    };
    var file;

    for (var i = 0; i < files.length; i++) {
      file = files[i]; // if file type could be detected

      if (file !== null) {
        if (accept.binary.indexOf(file.type) > -1) {
          // file is a binary, which we accept
          var data = file.getAsBinary();
        } else if (accept.text.indexOf(file.type) > -1) {
          // file is of type text, which we accept
          var data = file.getAsText(); // modify data with string methods
        }
      }
    }

    console.log(data);
    /*this.shadowRoot.appendChild(this.shadowRoot.cre)
    var myClass = Java.type("../../rest/dataService")
    let myClass = new LeBla();
    myClass.post();
    let dataService = new DataService()
    dataService.get()
    */

    var msgJson = "{\"distance\":" + this.distance + ",\"evidencePic\":\"" + this.evidencePic + "\"}";
    fetch(this.path + 'postPeriod', {
      method: "POST",
      body: msgJson,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      let successText = document.createElement('p');
      successText.innerHTML = 'Succesfully sent';
      this.shadowRoot.getElementById('mainPos').appendChild(successText);
    }).catch(err => {
      let failText = document.createElement('p');
      failText.innerHTML = 'Failed sending data';
      this.shadowRoot.getElementById('mainPos').appendChild(failText);
    });
  }

  constructor() {
    super();
    this.path = 'http://localhost:8080/testclienttest/rs/sql/';
  } //zu späterer Zeit: Überprüfung ob gerade eine Challenge!


  render() {
    return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/distance/participant/styles.css">
            <div id="mainPos" class="mainPos">
                <h1>Enter Your Distance</h1>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Distance</span>
                    </div>
                    <input id="distance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
                <br>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Evidence Picture</label>
                    <input id="evidencePic" accept=".png, .jpg, .jpeg" type="file" class="form-control-file" id="exampleFormControlFile1">
                </div>
                <br>
                <button type="submit" class="btn btn-primary" @click="${() => this.postPeriod()}">Submit</button>
            </div>
        `;
  }

}

window.customElements.define('distance-form-participant', DistanceFormParticipant);