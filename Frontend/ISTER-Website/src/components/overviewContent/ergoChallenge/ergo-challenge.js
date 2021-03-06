import {LitElement, html} from '@polymer/lit-element'
import DataService from '../../../services/rest/dataService.js'
import TranslationService from '../../../services/translation/translationService.js'

//Web Component for Menu Button "Ergo Challenge"
export default class ErgoChallenge extends LitElement{
    static get properties(){
        return{
            counter: Number,
            methodEntered: Boolean,
            translation: []
        }
    }

    constructor(){
        super();
        this.translation = TranslationService.getTranslation('ergo-challenge')
    }

    //returns the actual year depending on challenge -> if it's april or earlier it's the year before
    getChallengeYear(){
        var date = new Date().getFullYear()
        if(new Date().getMonth() < 4)
            return date - 1
        else
            return date
    }

    //gets actual session dates from service and adds it to page
    async getChallengeSessions(){
        let data = await DataService.get('challenge-sessions', JSON.parse('{"actualYear":"' + this.getChallengeYear() + '"}'))
        
        if(data != "failure"){       
            this.appendChildTo(data.roundOne)
            this.appendChildTo(data.roundTwo)
            this.appendChildTo(data.roundThree)
            this.appendChildTo(data.roundFour)
            this.appendChildTo(data.roundFive)
            this.appendChildTo(data.roundSix)
        }
        else{
            window.alert('CONNECTION ERROR')
        }
    }

    //prepares single row data
    appendChildTo(to){
        var li = document.createElement('li')
        li.innerHTML = `${this.counter}. ${this.translation["session"]}: ${this.prepareDate(to)}`
        this.counter++
        this.shadowRoot.getElementById('sessionList').appendChild(li)
    }

    //parses date
    prepareDate(to){
        var temp = to.split('-')
        return temp[2] + '. - ' + (parseInt(temp[2]) + 4) + '.' + temp[1] + '.' + temp[0]
    }

    render(){
        $(document).ready(() => { 
            
            //since we recreate the document, this method would get called again and again
            if(!this.methodEntered){
                this.counter = 1
                this.methodEntered = true
                this.getChallengeSessions()  
            }
        }) 
        return html`
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/ergoChallenge/styles.css"></link>
            <div class="background-image">
            </div>
            <div class="body-content">
                <h1><strong>${this.translation["ergoHeadline"]}</strong></h1>
                <h2>${this.translation["ergoSubheadlineOne"]}</h2>
                <p class="lineSeparator">${this.translation["ergoTextOne"]}</p>  
                <br>
                <h2>${this.translation["ergoSubheadlineTwo"]}</h2>
                <p class="lineSeparator">${this.translation["ergoTextTwo"]}</p>
                <ul id="sessionList">
                </ul>     
                <br>
                <h2>${this.translation["ergoSubheadlineThree"]}</h2>
                <p class="lineSeparator">${this.translation["ergoTextThree"]}</p>
                <br>
                <h2>${this.translation["ergoSubheadlineFour"]}</h2>
                <p class="lineSeparator">${this.translation["ergoTextFour"]}</p>
                <ul>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[0]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[1]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[2]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[3]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[4]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[5]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[6]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[7]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[8]}</li>
                    <li>${this.translation["ergoTextFourClasslist"].split(';')[9]}</li>
                </ul>
            </div>
        `
    }
}
window.customElements.define('ergo-challenge', ErgoChallenge)