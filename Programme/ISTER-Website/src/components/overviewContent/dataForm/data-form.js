import {LitElement, html, eventOptions} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js'

export default class DataForm extends LitElement{
    
    constructor(){
        super();
    }


        

    testMethod(paramId){
        console.log('content of p: ' + this.shadowRoot.getElementById(paramId).innerHTML)
    }


    render(){
        return html`
        <head>
        <h>Test</h>
        </head>
        <body>
        <p> E-Mail: <input type="text" name="email"></p>
    <p> Passwort: <input type="password" name="password"></p>
    <p> Vorname: <input type="text" name="firstName"/></p>
    <p> Nachname: <input type="text" name="lastName"></p>
    <p> Gebrtsdatum: <input type="date" name="dob"/></p>
    <p> Gewicht(Kg): <input type="number" name="weight"></p>
    <p> Geschlecht:
        <input type="radio" name="gender" value="m"> männlich
        <input type="radio" name="gender" value="f"> weiblich<br></p>
    <p> Verein: <input type="text" name="club"></p>
        </body>
        `
    }
}
window.customElements.define('data-form', DataForm)