import {LitElement, html} from '@polymer/lit-element'
import TranslationService from '../../services/translation/translationService.js'
import DataService from '../../services/rest/dataService.js';

//Web Component for Website Header (Countdown + Flag Dropdown)
export default class WebsiteHeader extends LitElement{
    static get properties(){
        return {
            translation: []
        }
    }

    constructor(){
        super();
        this.translation = []
        this.changeLanguage('german')
    }

    //gets called when a new language is selected, loads the new translation and sets it afterwards for this component
    async changeLanguage(language){
        await TranslationService.loadTranslation(language)
        this.translation = TranslationService.getTranslation('website-header')
    }

    //manages the countdown at the top of the website
    async countdown(){
        var data = await DataService.get('challenge-time')

        setInterval(_ => {
            //calculate time remaining
            var distance = data.time - new Date().getTime();
            
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            hours = this.zeroChecker(hours)
            minutes = this.zeroChecker(minutes)
            seconds = this.zeroChecker(seconds)

            //Load starts/ends translation for display
            var startsEnds = ""
            if(data.state == "STARTS")
                startsEnds = this.translation["headerStarts"]
            else
                startsEnds = this.translation["headerEnds"]

            //refresh website countdown content
            this.shadowRoot.getElementById('countdown').innerHTML = `
                <span><strong>${this.translation["headerCountdown"]} ${startsEnds} &rarr; </strong></span>${days}<span class="highlight"> ${this.translation["headerDay"]} </span>${hours}<span class="highlight"> ${this.translation["headerHour"]} </span>${minutes}<span class="highlight"> ${this.translation["headerMinutes"]} </span>${seconds}<span class="highlight"> ${this.translation["headerSeconds"]} </span>
                `
        }, 994);
    }

    //add styling zeros if necessary
    zeroChecker(nr){
        if(nr.toString().length == 1)
            return "0" + nr.toString();
        else 
            return nr;
    }

    render(){
        $(document).ready(() => { 
            //start countdown
            this.countdown()

            //set event for language change
            this.shadowRoot.getElementById('language').onchange = (event) => {
                this.changeLanguage(event.target.value)
            }
        })
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>

            <div class="background">
                <div id="language" class="language-options">
                    <input checked="checked" type="radio" id="line1" name="line-style" value="german"  /><label for="line1"></label>
                    <input type="radio" id="line2" name="line-style" value="english"  /><label for="line2"></label>
                    <input type="radio" id="line3" name="line-style" value="spanish"  /><label for="line3"></label>
                    <input type="radio" id="line4" name="line-style" value="croatian"  /><label for="line4"></label>
                </div>
                <h1 class="header" id="countdown"></h1>
            </div>
        `
    }
}
window.customElements.define('website-header', WebsiteHeader)