import {LitElement, html} from '@polymer/lit-element'

class DistanceFormParticipant extends LitElement{
    static get properties(){
        return{
            path:String,
            distance: Number,
            evidencePic: String
        }
    }

    postPeriod(){
        this.distance = this.shadowRoot.getElementById('distance').value;
        if(this.distance == "" || this.shadowRoot.getElementById('evidencePic').files[0] == undefined)
            this.shadowRoot.getElementById('notification').innerHTML = 'invalid data'
        
        else{
            var fileReader = new FileReader();
            fileReader.onload = event => {
                this.evidencePic = event.target.result
                var msgJson = "{\"distance\":" + this.distance + ",\"evidencePic\":\"" + this.evidencePic + "\"}";
            
                fetch(this.path + 'postPeriod',
                {
                    method: "POST",
                    body: msgJson,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => {
                    this.shadowRoot.getElementById('notification').innerHTML = 'Succesfully sent'
                })
                .catch(err => {
                    this.shadowRoot.getElementById('notification').innerHTML = 'Failed sending data'
                    console.log(err.target.value)
                })
            };

            fileReader.readAsDataURL(this.shadowRoot.getElementById('evidencePic').files[0]);
        }
    }

    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/';
        this.distance = 0;
    }

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
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
                <p id="notification"></p>
            </div>
        `
    }
}
window.customElements.define('distance-form-participant', DistanceFormParticipant);