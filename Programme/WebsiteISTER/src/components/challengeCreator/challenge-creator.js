import {LitElement, html} from '@polymer/lit-element'

class ChallengeCreator extends LitElement{
    static get properties(){
        return {

        }
    }
    constructor(){
        super();
    }

    render(){
        return html`
        <link rel="stylesheet" type="text/css" href=/src/components/challengeCreator/styles.css>
        <div class="mainPos">
            <h1>asdfasdf</h1>
        </div>
        `
    }
}
window.customElements.define('challenge-creator', ChallengeCreator)