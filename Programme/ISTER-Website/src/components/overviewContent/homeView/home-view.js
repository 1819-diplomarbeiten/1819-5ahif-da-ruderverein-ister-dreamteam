import {LitElement, html} from '@polymer/lit-element'
import TranslationService from '../../../services/translation/translationService.js'

export default class HomeView extends LitElement{
    static get properties(){
        return{
            translation: []
        }
    }

    constructor(){
        super()
        this.translation = TranslationService.getTranslation('home-view')
    }

    render(){
        return html`
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/homeView/styles.css"></link>
            <h1><strong>${this.translation["homeHeadline"]}</strong></h1>
            <div class="body-container">
                <img src="images/homeView.jpg" width="650" height="433" class="image">
                <div class="text-container">
                    <p class="lineSeparator">${this.translation["homeTextOne"]}</p>  
                    
                    <p class="lineSeparator">${this.translation["homeTextTwo"]}</p>
                    
                    <p class="lineSeparator">${this.translation["homeTextThree"]}</p>
                    <p><strong>ERGO - Challenge</strong></p>
                </div>
            </div>
        `
    }
}
window.customElements.define('home-view', HomeView)