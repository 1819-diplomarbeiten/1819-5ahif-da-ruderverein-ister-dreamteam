import {LitElement, html, eventOptions} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js'
import TranslationService from '../../../services/translation/translationService.js'

//Web Component for Data Form
export default class DataForm extends LitElement{
    static get properties(){
        return{
            firstName: String,
            lastName: String,
            birthday: String,
            weight: Number,
            gender: String,
            club: String,
            translation: [],
            entered: Boolean,
            isCreate: Boolean,
            isClub: Boolean,
            isClubCreation: Boolean,
            nameLong: String,
            nameShort: String
        }
    }

    constructor(){
        super();
        this.entered = false
        this.isClubCreation = true
        this.translation = TranslationService.getTranslation('login-form')
    }

    //checks if the data-form is called as edit or create
    checkIfCreateOrUpdate(){
        
        //check if firstName is passed as parameter, if yes it's called as edit
        if(this.getAttribute('firstName') != null){
            this.isCreate = false
            this.setDataInForm()
        }
        else    
            this.isCreate = true

        return this.isCreate
    }

    //called when data-form is opened as "edit" to set the field values with participant-data to edit
    setDataInForm(){
        this.shadowRoot.getElementById('firstName').value = this.getAttribute('firstName')
        this.shadowRoot.getElementById('lastName').value = this.getAttribute('lastName')
        this.shadowRoot.getElementById('weight').value = this.getAttribute('weight')
        
        //disable all needed contents so that we only see the participant-form
        this.shadowRoot.getElementById('birthdayContent').style.display = 'none'
        this.shadowRoot.getElementById('creationType').style.display = 'none'
        this.shadowRoot.getElementById('componentsStandardHeader').style.display = 'none'

        //enable participant edit content
        this.shadowRoot.getElementById('participantCreateEdit').style.display = 'initial'
        this.shadowRoot.getElementById('submitBtn').style.display = 'initial'
        this.shadowRoot.getElementById('componentsEditHeader').style.display = 'initial'

        //when gender == male, radio buttons have to be turn overed
        if(this.getAttribute("gender") == "m"){
            this.shadowRoot.getElementById("male").checked = true
        }

        this.shadowRoot.getElementById('club').value = this.getAttribute("club")
    }

    //fills dropdown list with current clubs from db
    fillClubDropdown(selectMenue){
        var clubs = this.shadowRoot.getElementById(selectMenue)
        var data = ''

        //check which dropdown content to create
        if(selectMenue == "club"){
            data = DataService.get('all-clubs')

            //create first empty option for no-club
            var option = document.createElement('option')
            option.innerHTML = ''
            clubs.appendChild(option)
        }
        else
            data = DataService.get('all-clubs-reduced')

        //iterate through club-list and add as dropdown child
        for(var i = 0; i < data.length; i ++){
            option = document.createElement('option')
            option.innerHTML = data[i]
            option.value = data[i]
            clubs.appendChild(option)
        }
    }

    //gets called when submit button is pressed
    submitBtnPressed(){
        this.setFieldValues()
        
        //are fields valid?
        if(this.fieldsAreValid()){

            //participant creation
            if(!this.isClub){

                //club also selected? (important for json)
                if(this.shadowRoot.getElementById('club').value != '')
                    DataService.post(JSON.parse('{"firstName":"' + this.firstName + '","msgType":"' + 'participantWithClub' + '","lastName":"' + this.lastName + '","birthday":"' + this.birthday + '","weight":"' + this.weight + '","gender":"' + this.gender + '","club":"' + this.club + '","email":"' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + '"}'), "data-form")
                else
                    DataService.post(JSON.parse('{"firstName":"' + this.firstName + '","msgType":"' + 'participantWithoutClub' + '","lastName":"' + this.lastName + '","birthday":"' + this.birthday + '","weight":"' + this.weight + '","gender":"' + this.gender + '","email":"' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + '"}'), "data-form")
            }
            else{
                //existing club
                if(this.isClubCreation)
                    DataService.post(JSON.parse('{"clubLong":"' + this.nameLong + '","msgType":"' + 'clubNew' + '","clubShort":"' + this.nameShort + '","email":"' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + '"}'), "data-form")
                //new club
                else
                    DataService.post(JSON.parse('{"club":"' + this.club + '","msgType":"' + 'clubExisting' + '","email":"' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + '"}'), "data-form")
            }
            
            //fire event for component change
            let events = new CustomEvent("submitBtnPressed", {
                bubbles: true
            })
            document.dispatchEvent(events);
        }
    }

    //load the values from html into the variables
    setFieldValues(){

        //if a participant is registrating
        if(!this.isClub){   
            this.firstName = this.shadowRoot.getElementById('firstName').value
            this.lastName = this.shadowRoot.getElementById('lastName').value
            this.weight = this.shadowRoot.getElementById('weight').value
            this.club = this.shadowRoot.getElementById('club').value

            //check if we have to set the birthday ..
            if(this.isCreate)
                this.birthday = this.shadowRoot.getElementById('birthday').value

            if(this.shadowRoot.getElementById('male').checked)
                this.gender = 'm'
            else if(this.shadowRoot.getElementById('female').checked)
                this.gender = 'f'
        }

        //else a club is registrating
        else{
            //creating new club
            if(this.isClubCreation){
                this.nameLong = this.shadowRoot.getElementById('nameLong').value
                this.nameShort = this.shadowRoot.getElementById('nameShort').value
            }
            //admin an existing club
            else
                this.club = this.shadowRoot.getElementById('clubReduced').value
        }
    }
 
    //bean validation input fields
    fieldsAreValid(){
        var valid = true

        //validate participant field
        if(!this.isClub){

            //check if a first name is selected
            if(this.firstName == ''){
                this.shadowRoot.getElementById('firstName').style.borderColor = 'red'
                valid = false
            }   
            else
                this.shadowRoot.getElementById('firstName').style.borderColor = ''

            //check if a last name is selected
            if(this.lastName == ''){
                this.shadowRoot.getElementById('lastName').style.borderColor = 'red'
                valid = false
            }
            else
                this.shadowRoot.getElementById('lastName').style.borderColor = ''
            
            //do we have to check for birthday?
            if(this.isCreate){

                //check if a birthday is selected
                if(this.birthday == ''){
                    this.shadowRoot.getElementById('birthday').style.borderColor = 'red'
                    valid = false
                }
                else
                    this.shadowRoot.getElementById('birthday').style.borderColor = ''
            }
            
            //check if valid weight is selected
            if(this.weight == '' || isNaN(this.weight)){
                this.shadowRoot.getElementById('weight').style.borderColor = 'red'
                valid = false
            }
            else
                this.shadowRoot.getElementById('weight').style.borderColor = ''
        }

        //or validate club fields
        else{

            //create from existing club
            if(!this.isClubCreation){

                //check if club selected
                if(this.club == ''){
                    this.shadowRoot.getElementById('clubReduced').style.borderColor = 'red'
                    valid = false
                }
                else
                    this.shadowRoot.getElementById('clubReduced').style.borderColor = ''
            }
            
            //create new club
            else{

                //check if nameLong selected
                if(this.nameLong == ''){
                    this.shadowRoot.getElementById('nameLong').style.borderColor = 'red'
                    valid = false
                }
                else
                    this.shadowRoot.getElementById('nameLong').style.borderColor = ''

                //check if nameShort selected
                if(this.nameShort == ''){
                    this.shadowRoot.getElementById('nameShort').style.borderColor = 'red'
                    valid = false
                }
                else
                    this.shadowRoot.getElementById('nameShort').style.borderColor = ''
            }
        }
        return valid
    }

    creationTypeSelected(toEnable, toDisable){
        //enable / disable club / participant registration
        this.shadowRoot.getElementById(toEnable).style.display = 'initial'
        this.shadowRoot.getElementById(toDisable).style.display = 'none'

        //when club registr -> display the 2 options
        if(toEnable != 'participantCreateEdit'){
            this.shadowRoot.getElementById('createOrTakeover').style.display = 'initial'
            this.isClub = true
        }
        else{
            this.isClub = false
        }
        
        this.shadowRoot.getElementById('submitBtn').style.display = 'initial'
    }

    setClubRegistrationContent(toEnable, toDisable){
        //enable / disable club create / existing registration
        this.shadowRoot.getElementById(toEnable).style.display = 'initial'
        this.shadowRoot.getElementById(toDisable).style.display = 'none'
        this.shadowRoot.getElementById('submitBtn').style.display = 'initial'

        if(toEnable == 'createClub')
            this.isClubCreation = true
        else
            this.isClubCreation = false
    }

    render(){
        $(document).ready(() => { 

            //since we recreate the document, make sure we only fill and check 1 time
            if(this.entered == false){

                //fill both dropdown lists
                this.fillClubDropdown('club')
                this.fillClubDropdown('clubReduced')

                //birthday only pickable at first creation
                if(this.checkIfCreateOrUpdate())
                    $(this.shadowRoot.getElementById('birthday')).Zebra_DatePicker();

                this.entered = true
            }
        })
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/dataForm/styles.css">
            <h1 id="componentsEditHeader" style="display:none">${this.translation["editHeader"]}Persönliche Daten bearbeitenNoTranslation<br></h1>
            <h1 id="componentsStandardHeader">${this.translation["loginHeader"]}</h1>
            <div id="creationType">
                <br>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["registerAs"]}Registrieren alsNoTranslation</strong></span>
                </div>
                <br>
                <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="clubs" name="clubOrParticipant" @click="${() => this.creationTypeSelected('clubAssignment', 'participantCreateEdit')}">
                    <label class="custom-control-label" for="clubs">${this.translation["pdfClub"]}</label>
                </div>
                <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="participant" name="clubOrParticipant" @click="${() => this.creationTypeSelected('participantCreateEdit', 'clubAssignment')}">
                    <label class="custom-control-label" for="participant">${this.translation["pdfParticipant"]}</label>
                </div>
            </div>

            <div id="participantCreateEdit" style="display:none">
                <br>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["firstName"]} *</strong></span>
                    </div>
                    <input id="firstName" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
                <br>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["lastName"]} *</strong></span>
                    </div>
                    <input id="lastName" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
                <div class="input-group input-group-sm mb-3" id="birthdayContent">
                    <br>
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["birthday"]} *</strong></span>
                    </div>
                    <input id="birthday" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style="width:170px;text-align:right">
                </div>
                <br>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["weight"]} (kg) *</strong></span>
                    </div>
                    <input id="weight" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>
                <br>
                <div id=genders">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["gender"]} *</strong></span>
                    </div>
                    <br>
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="female" name="groupOfDefaultRadios" checked>
                        <label class="custom-control-label" for="female">${this.translation["female"]}</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="male" name="groupOfDefaultRadios">
                        <label class="custom-control-label" for="male">${this.translation["male"]}</label>
                    </div>
                    <br>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["pdfClub"]}</strong></span>
                        </div>
                        <select id="club" class="form-control" style="width:170px">
                        </select>
                    </div>
                </div>
            </div>

            <div id="clubAssignment" style="display:none">
                <div id="createOrTakeover">
                    <br>
                    <label class="radio-inline"><input type="radio" checked name="optradio" @click="${() => this.setClubRegistrationContent('createClub', 'existingClub')}">${this.translation["createClub"]}Neuen Club erstellenNoTranslation</label>
                    <label class="radio-inline"><input type="radio" name="optradio" @click="${() => this.setClubRegistrationContent('existingClub', 'createClub')}">${this.translation["existingClub"]}Vorhandenen übernehmenNoTranslation</label>
                </div>
                <div id="createClub">
                    <div class="input-group input-group-sm mb-3">
                        <br>
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["longname"]} longnameNoTranslation *</strong></span>
                        </div>
                        <input id="nameLong" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style="width:170px;text-align:right">
                    </div>
                    <br>
                    <div class="input-group input-group-sm mb-3">   
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["pdfShortcut"]} *</strong></span>
                        </div>
                        <input id="nameShort" type="text" class="form-control" aria-label="Small" maxlength="4" aria-describedby="inputGroup-sizing-sm" style="width:170px;text-align:right">
                    </div>
                </div>
                <div id="existingClub" style="display:none">
                    <br>
                    <br>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm"><strong>${this.translation["pdfClub"]}</strong></span>
                        </div>
                        <select id="clubReduced" class="form-control" style="width:170px">
                        </select>
                    </div>
                </div>
            </div>
            <br>
            <button id="submitBtn" type="submit" style="display:none" class="btn btn-primary custom-color" @click="${() => this.submitBtnPressed()}">${this.translation["distanceSubmitBtn"]}</button>
            <br>
            <br>
        `
    }
}
window.customElements.define('data-form', DataForm)