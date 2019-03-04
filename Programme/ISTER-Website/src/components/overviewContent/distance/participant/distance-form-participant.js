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

    //gets called per user button, POST a single period from participant to server
    manageUpload(){
        var fileReader = new FileReader();

        //gets called when var file is ready 
        fileReader.onload = event => {
            this.evidencePic = event.target.result
            this.putPeriod()
        };

        //get file
        var file = this.shadowRoot.getElementById('evidencePic').files[0]

        fileReader.readAsDataURL(file);   
    }

    //POST per Service
    async putPeriod(){
        let response = await DataService.post(JSON.parse("{\"distance\":" + this.distance + ",\"evidencePic\":\"" + this.evidencePic + "\",\"email\":\"" + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + "\"}"), "period")
        if(response == "success")
            this.shadowRoot.getElementById('waiting').innerHTML = `${this.translation["distanceParticipantSuccessThree"]}!`
        else
            this.shadowRoot.getElementById('waiting').innerHTML = `${this.translation["uploadDistanceFail"]}`
        this.shadowRoot.getElementById('notification').innerHTML = ''
        this.uploaded = true
    }

    //check if a valid (field filled, only numbers) distance is entered
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

    //displays filename beneath selection button
    setFileName(){
        this.shadowRoot.getElementById('doneTwo').disabled = false
        this.shadowRoot.getElementById('picNotification').innerHTML = this.shadowRoot.getElementById('evidencePic').files[0].name
    }

    //handles displaying of the different parts
    activate(toActivate){
        if(!this.uploaded) {
            switch(toActivate){
                //"Enter your reached distance"
                case '1':
                    this.shadowRoot.getElementById('contentOne').style.display = 'initial'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'none'
                    break
                //"choose your proof photo"
                case '2':
                    if(this.validDistance()){
                        this.shadowRoot.getElementById('contentOne').style.display = 'none'
                        this.shadowRoot.getElementById('contentTwo').style.display = 'initial'
                        this.shadowRoot.getElementById('contentThree').style.display = 'none'
                        this.shadowRoot.getElementById('stepBackThree').style.display = 'none'
                    }
                    break
                //upload to server
                case '3':
                    this.shadowRoot.getElementById('contentOne').style.display = 'none'
                    this.shadowRoot.getElementById('contentTwo').style.display = 'none'
                    this.shadowRoot.getElementById('contentThree').style.display = 'initial'
                    this.manageUpload()
                break
            }
        }
    }

    render(){
        $(document).ready(() => { 
            this.shadowRoot.getElementById('evidencePic').onchange = () => {this.setFileName()}
        }) 

        return html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/distance/participant/styles.css">
        <div class="background-image">
        </div>
        <div class="body-content">
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
                    <button id="doneTwo" disabled type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('3')}">${this.translation["distanceSubmitBtn"]}</button>
                    <button type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('1')}">${this.translation["distanceBackBtn"]}</button><br><br>
                </div>
            </div>
            <div>
                <p class="number-design">3</p>
                <h2 style="margin-top:-3%;margin-left:4%"><strong>${this.translation["distanceHeadlineThree"]}</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentThree" style="display:none">
                <h3 id="waiting"><strong>${this.translation["waiting"]}</strong></h3>
                <p id="notification"></p>
                <button id="stepBackThree" style="display:none" type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('2')}">${this.translation["distanceBackBtn"]}</button>
            </div>
        </div>
        `
    }
}
window.customElements.define('distance-form-participant', DistanceFormParticipant);