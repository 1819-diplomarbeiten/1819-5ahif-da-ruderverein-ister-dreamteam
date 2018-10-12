import {LitElement, html} from '@polymer/lit-element'

class ClubRanking extends LitElement{
    static get properties(){
        return{

        }
    }

    constructor(){
        super();
    }

    render(){
        return html`
            <link rel="stylesheet" type="text/css" href="/src/components/clubRanking/styles.css"></link>
            <div class="mainPos">
                <h1>30K Club Ranking List</h1>
                <h2>Select your choices and submit to downlaod pdf</h2>
                <paper-dropdown-menu label="Year">
                    <paper-listbox slot="dropdown-content">
                        <paper-item>2017/2018</paper-item>
                        <paper-item>2016/2017</paper-item>
                        <paper-item>2015/2016</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br>
                <paper-dropdown-menu label="Result">
                    <paper-listbox slot="dropdown-content">
                        <paper-item>Total</paper-item>
                        <paper-item>1st Session</paper-item>
                        <paper-item>2nd Session</paper-item>
                        <paper-item>3rd Session</paper-item>
                        <paper-item>4th Session</paper-item>
                        <paper-item>5th Session</paper-item>
                        <paper-item>6th Session</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br>
                <paper-dropdown-menu label="Sequence">
                    <paper-listbox slot="dropdown-content">
                        <paper-item>Alphabetic</paper-item>
                        <paper-item>TopDown</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br><br>
                <button>Download pdf</button>
            </div>
        `
    }
}
window.customElements.define('club-ranking', ClubRanking)