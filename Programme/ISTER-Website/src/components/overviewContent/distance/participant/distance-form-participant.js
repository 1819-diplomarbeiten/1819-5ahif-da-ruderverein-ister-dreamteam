import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../services/rest/dataService.js'
import TranslationService from '../../../../services/translation/translationService.js'

export default class DistanceFormParticipant extends LitElement{
    static get properties(){
        return{
            distance: Number,
            evidencePic: String,
            uploaded: Boolean,
            translation: []
        }
    }
    
    constructor(){
        super();
        this.uploaded = false;
        this.translation = TranslationService.getTranslation('participant-distance')
    }

    postPeriod(){

        var fileReader = new FileReader();
        fileReader.onload = event => {
            this.evidencePic = event.target.result
            this.manage(this.evidencePic)
        };
        var file = this.shadowRoot.getElementById('evidencePic').files[0]

        if(file == undefined)
            this.manage(null)
        else
            fileReader.readAsDataURL(file);   
    }

    manage(evidencePic){
        DataService.postPeriod(this.distance, evidencePic)
        this.shadowRoot.getElementById('waiting').innerHTML = `${this.translation["distanceParticipantSuccessThree"]}!`
        this.shadowRoot.getElementById('notification').innerHTML = ''
        this.uploaded = true
    }

    validDistance(){
        this.distance = this.shadowRoot.getElementById('distance').value;
        if(isNaN(this.distance) == true || this.distance == ""){
            this.shadowRoot.getElementById('distanceNotification').innerHTML = `<span class="error">${this.translation["distanceParticipantErrorMsg"]}<span>`
            return false
        }
        else{
            this.shadowRoot.getElementById('distanceNotification').innerHTML = ''
            return true
        }
    }

    setFileName(){
        this.shadowRoot.getElementById('picNotification').innerHTML = this.shadowRoot.getElementById('evidencePic').files[0].name
    }

    activate(toActivate){
        if(!this.uploaded) {
            switch(toActivate){
                case '1':
                    this.shadowRoot.getElementById('contentOne').style.display = 'initial'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'none'
                    break
                case '2':
                    if(this.validDistance()){
                        this.shadowRoot.getElementById('contentOne').style.display = 'none'
                        this.shadowRoot.getElementById('contentTwo').style.display = 'initial'
                        this.shadowRoot.getElementById('contentThree').style.display = 'none'
                        this.shadowRoot.getElementById('stepBackThree').style.display = 'none'
                    }
                    break
                case '3':
                    this.shadowRoot.getElementById('contentOne').style.display = 'none'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'initial'
                    this.postPeriod()
                break
            }
        }
    }

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        $(document).ready(() => { 
            this.shadowRoot.getElementById('evidencePic').onchange = () => {this.setFileName()}
        }) 
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/distance/participant/styles.css">
        <br>
        <div>
            <p class="number-design" @click="${() => this.activate('1')}">1</p>
            <h2 style="margin-top:-3%;margin-left:4%" @click="${() => this.activate('1')}"><strong>${this.translation["distanceParticipantHeadlineOne"]}</strong></h2>
        </div>
        <div class="horizontal-line"></div><br>
        <div id="contentOne">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["distance"]}</strong></span>
                </div>
                <input id="distance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
            <p id="distanceNotification"></p>
            <br>
            <button type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('2')}">${this.translation["distanceSubmitBtn"]}</button><br><br>
        </div>
        <div>
            <p class="number-design">2</p>
            <h2 style="margin-top:-3%;margin-left:4%"><strong>${this.translation["distanceParticipantHeadlineTwo"]}</strong></h2>
        </div>
        <div class="horizontal-line"></div><br>
        <div id="contentTwo" style="display:none">
            <div class="form-group">
                <label class="btn btn-default btn-file">
                ${this.translation["distanceParticipantSelectionTwo"]} <input id="evidencePic" accept=".png, .jpg, .jpeg" class="form-control-file" type="file" style="display: none;">
                </label>
            </div>
            
            <p id="picNotification"></p>
            <div class="btn-group" role="group">
                <button id="doneTwo" type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('3')}">${this.translation["distanceSubmitBtn"]}</button>
                <button type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('1')}">${this.translation["distanceBackBtn"]}</button><br><br>
            </div>
        </div>
        <div>
            <p class="number-design">3</p>
            <h2 style="margin-top:-3%;margin-left:4%"><strong>${this.translation["distanceHeadlineThree"]}</strong></h2>
        </div>
        <div class="horizontal-line"></div><br>
        <div id="contentThree" style="display:none">
            <h3 id="waiting"><strong>Waiting ...</strong></h3>
            <p id="notification"></p>
            <button id="stepBackThree" style="display:none" type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('2')}">${this.translation["distanceBackBtn"]}</button>
        </div>
        `
    }
}
window.customElements.define('distance-form-participant', DistanceFormParticipant);