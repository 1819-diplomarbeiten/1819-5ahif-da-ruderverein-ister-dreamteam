import {LitElement, html} from '@polymer/lit-element'

class WebSiteHeader extends LitElement{
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
                
                this.shadowRoot.getElementById('demo').innerHTML = 'THE CHALLENGE ' + data.state + ' ==> ' + days + ' Days ' + hours + ' Hours ' + minutes + ' Minutes ' + seconds + ' Seconds'
            }, 1000);
        })
    }

    render(){
        window.onload = () => {
            this.countdown()
        }
        return html`
            <div class="background">
                <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>
                <h1 class="header" id="demo" @click="${() => this.countdown()}"></h1>
                <div class="languages">
                    <img src="images/germanFlag.png" width="70" height="35" @click="${() => this.changeLanguage('german')}">
                    <img src="images/englishFlag.png" width="70" height="35" @click="${() => this.changeLanguage('english')}">
                </div>
            <div>
        `
    }
}
window.customElements.define('website-header', WebSiteHeader)