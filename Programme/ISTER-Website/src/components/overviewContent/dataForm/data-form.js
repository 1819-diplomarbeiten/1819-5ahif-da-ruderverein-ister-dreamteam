import {LitElement, html, eventOptions} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js'
import TranslationService from '../../../services/translation/translationService.js'

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
            isCreate: Boolean
        }
    }

    constructor(){
        super();
        this.entered = false
        this.translation = TranslationService.getTranslation('login-form')
    }

    checkIfCreateOrUpdate(){
        if(this.getAttribute('firstName') != null){
            this.isCreate = false
            this.setDataInForm()
        }
    }

    setDataInForm(){
        this.shadowRoot.getElementById('firstName').value = this.getAttribute('firstName')
        this.shadowRoot.getElementById('lastName').value = this.getAttribute('lastName')
        this.shadowRoot.getElementById('weight').value = this.getAttribute('weight')
        this.shadowRoot.getElementById('birthdayContent').style.display = 'none'
        if(this.getAttribute("gender") == "m"){
            this.shadowRoot.getElementById("male").checked = true
        }
        this.shadowRoot.getElementById('club').value = this.getAttribute("club")
    }

    fillClubDropdown(){
        var clubs = this.shadowRoot.getElementById('club')
        var data = DataService.get('all-clubs')

        var option = document.createElement('option')
        option.innerHTML = ''
        clubs.appendChild(option)

        for(var i = 0; i < data.length; i ++){
            option = document.createElement('option')
            option.innerHTML = data[i]
            option.value = data[i]
            clubs.appendChild(option)
        }
    }

    submitBtnPressed(){
        this.setValues()

        //bean validation
        if(this.fieldsAreValid()){
            if(this.isCreate)
            //is a club selected?
            if(this.shadowRoot.getElementById('club').value == '')
                DataService.post(JSON.parse('{"firstName":"' + this.firstName + '","lastName":"' + this.lastName + '","birthday":"' + this.birthday + '","weight":"' + this.weight + '","gender":"' + this.gender + '","club":"' + this.club + '","email":"' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + '"}'), "data-form")
            else
                DataService.post(JSON.parse('{"firstName":"' + this.firstName + '","lastName":"' + this.lastName + '","birthday":"' + this.birthday + '","weight":"' + this.weight + '","gender":"' + this.gender + '","email":' + gapi.auth2.getAuthInstance()['currentUser'].get().getBasicProfile().getEmail() + '"}'), "data-form")
        
            //fire event for component change
            let events = new CustomEvent("submitBtnPressed", {
                bubbles: true
            })
            document.dispatchEvent(events);
        }
    }

    setValues(){
        this.firstName = this.shadowRoot.getElementById('firstName').value
        this.lastName = this.shadowRoot.getElementById('lastName').value
        this.birthday = this.shadowRoot.getElementById('birthday').value
        this.weight = this.shadowRoot.getElementById('weight').value
        this.club = this.shadowRoot.getElementById('club').value

        if(this.shadowRoot.getElementById('male').checked)
            this.gender = 'm'
        else if(this.shadowRoot.getElementById('female').checked)
            this.gender = 'f'
    }

    fieldsAreValid(){
        var valid = true
        if(this.firstName == ''){
            this.shadowRoot.getElementById('firstName').style.borderColor = 'red'
            valid = false
        }else
        this.shadowRoot.getElementById('firstName').style.borderColor = ''

        if(this.lastName == ''){
            this.shadowRoot.getElementById('lastName').style.borderColor = 'red'
            valid = false
        }else
        this.shadowRoot.getElementById('lastName').style.borderColor = ''
        
        if(this.birthday == ''){
            this.shadowRoot.getElementById('birthday').style.borderColor = 'red'
            valid = false
        }else
        this.shadowRoot.getElementById('birthday').style.borderColor = ''
        
        if(this.weight == '' || isNaN(this.weight)){
            this.shadowRoot.getElementById('weight').style.borderColor = 'red'
            valid = false
        }else
        this.shadowRoot.getElementById('weight').style.borderColor = ''

        return valid
    }

    render(){
        $(document).ready(() => { 
            if(this.entered == false){
                this.fillClubDropdown()
                $(this.shadowRoot.getElementById('birthday')).Zebra_DatePicker();
                this.checkIfCreateOrUpdate()
                this.entered = true
            }
        })
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/dataForm/styles.css">
            <h1>${this.translation["loginHeader"]}</h1>
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
            <div>
            <br>
            <button id="submitBtn" type="submit" class="btn btn-primary custom-color" @click="${() => this.submitBtnPressed()}">${this.translation["distanceSubmitBtn"]}</button>
            <br>
            <br>
        `
    }
}
window.customElements.define('data-form', DataForm)