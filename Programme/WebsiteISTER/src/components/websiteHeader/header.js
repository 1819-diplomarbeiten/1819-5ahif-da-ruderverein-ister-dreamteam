import {LitElement, html} from '@polymer/lit-element'

class WebSiteHeader extends LitElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <div class="background">
                <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>
                <h1 class="header">THE CHALLENGE STARTS ==>  34 Days 05 Hours 48 Minutes 26 Seconds</h1>
            <div>
        `
    }
}
window.customElements.define('website-header', WebSiteHeader)