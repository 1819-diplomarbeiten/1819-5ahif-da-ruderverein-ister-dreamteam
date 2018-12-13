import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../../rest/dataService.js'

export default class DistanceFormParticipant extends LitElement{
    static get properties(){
        return{
            distance: Number,
            evidencePic: String,
            uploaded: Boolean
        }
    }
    
    constructor(){
        super();
        this.uploaded = false;
    }

    postPeriod(){
        var fileReader = new FileReader();
        fileReader.onload = event => {
            this.evidencePic = event.target.result
            DataService.postPeriod(this.distance, this.evidencePic)
            this.shadowRoot.getElementById('waiting').innerHTML = 'Your distance is successfully uploaded!'
            this.shadowRoot.getElementById('notification').innerHTML = ''
            this.uploaded = true
        };
        fileReader.readAsDataURL(this.shadowRoot.getElementById('evidencePic').files[0]);   
    }

    validDistance(){
        this.distance = this.shadowRoot.getElementById('distance').value;
        if(isNaN(this.distance) == true || this.distance == ""){
            this.shadowRoot.getElementById('distanceNotification').innerHTML = '<span class="error">Invalid Distance<span>'
            return false
        }
        else{
            this.shadowRoot.getElementById('distanceNotification').innerHTML = ''
            return true
        }
    }

    setFileName(){
        this.shadowRoot.getElementById('picNotification').innerHTML = this.shadowRoot.getElementById('evidencePic').files[0].name
        this.shadowRoot.getElementById('doneTwo').disabled = false
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
            /*var dropzone = new Dropzone(this.shadowRoot.getElementById('demo-upload'), {
                previewTemplate: document.querySelector('#preview-template').innerHTML,
                parallelUploads: 2,
                thumbnailHeight: 120,
                thumbnailWidth: 120,
                maxFilesize: 3,
                filesizeBase: 1000,
                thumbnail: function(file, dataUrl) {
                  if (file.previewElement) {
                    file.previewElement.classList.remove("dz-file-preview");
                    var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                    for (var i = 0; i < images.length; i++) {
                      var thumbnailElement = images[i];
                      thumbnailElement.alt = file.name;
                      thumbnailElement.src = dataUrl;
                    }
                    setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
                  }
                }
              });*/
        }) 
        return html`
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/distance/participant/styles.css">
        <script src="/node_modules/dropzone/dist/dropzone.js" type="text/javascript"></script>
        <link rel="stylesheet" href="/node_modules/dropzone/dist/min/dropzone.min.css" type="text/css">
        <div style="margin-top:2%;margin-left: 2%">
            <div>
                <p class="number-design" @click="${() => this.activate('1')}">1</p>
                <h2 style="margin-top:-3%;margin-left:4%" @click="${() => this.activate('1')}"><strong>Enter your reached distance</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentOne" style="display:none">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>Distance</strong></span>
                    </div>
                    <input id="distance" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
                <p id="distanceNotification"></p>
                <br>
                <button type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('2')}">Done</button><br><br>
            </div>


            <div>
                <p class="number-design">2</p>
                <h2 style="margin-top:-3%;margin-left:4%"><strong>Select your evidence picture</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentTwo" style="display:none">
                <div class="form-group">
                    <label class="btn btn-default btn-file">
                        Select Evidence Pic <input id="evidencePic" accept=".png, .jpg, .jpeg" class="form-control-file" type="file" style="display: none;">
                    </label>
                </div>
                <!--<div class="dropzone">
                    <FORM class="dropzone needsclick" id="demo-upload" action="/upload">
                        <DIV class="dz-message needsclick">    
                            Drop files here or click to upload.<BR>
                            <SPAN class="note needsclick">(This is just a demo dropzone. Selected 
                            files are <STRONG>not</STRONG> actually uploaded.)</SPAN>
                        </DIV>
                    </FORM>
                </div>-->
                
                <p id="picNotification"></p>
                <div class="btn-group" role="group">
                    <button id="doneTwo" type="submit" class="btn btn-primary custom-color" @click="${() => this.activate('3')}" disabled>Done</button>
                    <button type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('1')}">Step Back</button><br><br>
                </div>
            </div>


            <div>
                <p class="number-design">3</p>
                <h2 style="margin-top:-3%;margin-left:4%"><strong>Upload to Server</strong></h2>
            </div>
            <div class="horizontal-line"></div><br>
            <div id="contentThree" style="display:none">
                <h3 id="waiting"><strong>Waiting ...</strong></h3>
                <p id="notification"></p>
                <button id="stepBackThree" style="display:none" type="submit" class="btn btn-primary custom-color-reverse" @click="${() => this.activate('2')}">Step Back</button>
            </div>
        </div>
        `
    }
}
window.customElements.define('distance-form-participant', DistanceFormParticipant);