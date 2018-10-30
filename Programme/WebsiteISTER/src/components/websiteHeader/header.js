import {LitElement, html} from '@polymer/lit-element'

class WebSiteHeader extends LitElement{
    constructor(){
        super();
    }

    changeLanguage(language){
        console.log(language + ' selected as language')
    }

    render(){
        return html`
            <div class="background">
                <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>
                <h1 class="header">THE CHALLENGE STARTS ==>  34 Days 05 Hours 48 Minutes 26 Seconds</h1>
                <div class="languages">
                    <img src="images/germanFlag.png" width="70" height="35" @click="${() => this.changeLanguage('german')}">
                    <img src="images/englishFlag.png" width="70" height="35" @click="${() => this.changeLanguage('english')}">
                </div>
            <div>
        `
    }
}
window.customElements.define('website-header', WebSiteHeader)