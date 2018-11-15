import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../rest/dataService.js'

export default class DistanceFormParticipant extends LitElement{
    static get properties(){
        return{
            distance: Number,
            evidencePic: String
        }
    }

    postPeriod(){
        this.distance = this.shadowRoot.getElementById('distance').value;
        if(isNaN(this.distance) == true)
            this.distance = ""
        if(this.distance == "" || this.shadowRoot.getElementById('evidencePic').files[0] == undefined)
            this.shadowRoot.getElementById('notification').innerHTML = 'invalid distance or no pic selected'
        
        else{
            var fileReader = new FileReader();
            fileReader.onload = event => {
                this.evidencePic = event.target.result
                var msgJson = "{\"distance\":" + this.distance + ",\"evidencePic\":\"" + this.evidencePic + "\"}";
                DataService.postPeriod(this.distance, this.evidencePic)
                this.shadowRoot.getElementById('notification').innerHTML = 'Succesfully sent'
            };

            fileReader.readAsDataURL(this.shadowRoot.getElementById('evidencePic').files[0]);
        }
    }

    constructor(){
        super();
    }

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
            return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/distance/participant/styles.css">
            <div id="mainPos" class="mainPos">
                <h1><em><strong>Enter Your Distance</em></strong></h1>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><em>Distance</em></span>
                    </div>
                    <input id="distance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
                <br>
                <div class="form-group"><em>
                    <label for="exampleFormControlFile1">Select Evidence Picture</label>
                    <input id="evidencePic" accept=".png, .jpg, .jpeg" type="file" class="form-control-file" id="exampleFormControlFile1">
                </em></div>
                <br>
                <button type="submit" class="btn btn-primary" @click="${() => this.postPeriod()}">Submit</button>
                <p id="notification"></p>
            </div>
        `
    }
}
window.customElements.define('distance-form-participant', DistanceFormParticipant);