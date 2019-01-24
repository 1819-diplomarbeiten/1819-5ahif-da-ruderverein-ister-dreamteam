import {LitElement, html} from '@polymer/lit-element'
import TranslationService from '../../services/translation/translationService.js'
import DataService from '../../services/rest/dataService.js';

export default class WebsiteHeader extends LitElement{
    static get properties(){
        return {
            path: String,
            translation: []
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost/restApi/rest'
        this.translation = []
        this.changeLanguage('german')

    }

    //gets called when a new language is selected, loads the new translation and sets it afterwards for this component
    changeLanguage(language){
        TranslationService.loadTranslation(language)
        this.translation = TranslationService.getTranslation('website-header')
    }

    //manages the countdown at the top of the website
    countdown(){
        var data = DataService.get('challenge-time')
        setInterval(_ => {
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

    formatState () {
          var $state = $(
            '<span><img src="images/germanFlag.png" class="img-flag" /> ' + 'seas' + '</span>'
          );
          return $state;
    }

    render(){
        window.onload = () => {
            this.countdown()
            this.shadowRoot.getElementById('language').onchange = (event) => {
                this.changeLanguage(event.target.value)
            }
        }
        $(document).ready(() => { 
            /*console.log(this.shadowRoot.getElementById('social'))
            console.log(window.Select2)
            $(this.shadowRoot.getElementById('social')).select2({
                templateResult: $(this.formatState())
               });
               
               var counter = 0
               var x = setInterval(_ => {
                if(counter < 4){
                    counter++
                }
                else{
                    this.shadowRoot.getElementById('social').select2({
                templateResult: this.formatState()
               });
                }
            }, 994);*/
        })
        /*<!--<select id="dropDownSequence" class="form-control" style="width:60px">
                        <option value="english"><img src="images/englishFlag.png"></option>
                        <option value="german"><a style="background-image:url(images/germanFlag.png);height:10px;width:10px" class="img-thumbnail" href=""> </a></option>
                    </select>
                    <img src="images/germanFlag.png" width="70" height="35" @click="${() => this.changeLanguage('german')}">
                    <img src="images/englishFlag.png" width="70" height="35" @click="${() => this.changeLanguage('english')}">--> */ 
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>
            <!--<link href="/node_modules/select2/select2.css" rel="stylesheet" type="text/css">
            <script src="/node_modules/select2/select2.js"></script>-->

            <div class="background">
                <select id="language" class="language-options">
                    <option value='german'>German</option>
                    <option value='english'>English</option>
                </select>
                <h1 class="header" id="countdown"></h1>
            </div>
        `
    }
}
window.customElements.define('website-header', WebsiteHeader)