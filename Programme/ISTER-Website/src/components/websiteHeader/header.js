import {LitElement, html} from '@polymer/lit-element'

export default class WebSiteHeader extends LitElement{
    static get properties(){
        return {
            path: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost:8080/testserver/rs/sql/'
    }

    changeLanguage(language){
        console.log(language + ' selected as language')
    }

    countdown(){
        fetch(this.path + 'actualChallengeTime', {
            method: 'GET'
        })
        .then((resp) => resp.json())
        .then(data => {
            var x = setInterval(_ => {
                var distance = data.time - new Date().getTime();
                
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                hours = this.zeroChecker(hours, 'hour')
                minutes = this.zeroChecker(minutes, 'minute')
                seconds = this.zeroChecker(seconds, 'second')
                this.shadowRoot.getElementById('countdown').innerHTML = '<span><strong>THE CHALLENGE ' + data.state + ' &rarr;</strong></span>  ' + days + '<span class="highlight"> Days</span> ' + hours + ' <span class="highlight">Hours</span> ' + minutes + ' <span class="highlight">Minutes</span> ' + seconds + ' <span class="highlight">Seconds</span>'
            }, 994);
        })
    }

    zeroChecker(nr, mode){
        if(nr.toString().length == 1)
            return "0" + nr.toString();
        else 
            return nr;
    }

    render(){
        window.onload = () => {
            this.countdown()
        }
        return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <div class="background">
                <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>
                <h1 class="header" id="countdown"></h1>
                <div class="languages">
                    <select id="dropDownSequence" class="form-control" style="width:60px">
                        <!--<option value="german"><img src="images/germanFlag.png"></option>-->
                        <option value="english"><img src="images/englishFlag.png"></option>
                        <option value="german"><a style="background-image:url(images/germanFlag.png);height:10px;width:10px" class="img-thumbnail" href=""> </a></option>
                    </select>
                    <!--<img src="images/germanFlag.png" width="70" height="35" @click="${() => this.changeLanguage('german')}">
                    <img src="images/englishFlag.png" width="70" height="35" @click="${() => this.changeLanguage('english')}">-->
                </div>
                
            <div>
        `
    }
}
window.customElements.define('website-header', WebSiteHeader)