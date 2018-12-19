import {LitElement, html} from '@polymer/lit-element'

export default class HomeView extends LitElement{

    constructor(){
        super()
    }

    render(){
        return html`
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/homeView/styles.css"></link>
            <div class="mainPos">
                <div style="margin-left:2%">
                    <h1><strong>Willkommen zur ERGO-Challenge Seite des Linzer Rudervereins ISTER</strong></h1>
                    <div class="body-container">
                        <img src="images/homeView.jpg" width="650" height="433" class="image">
                        <div class="text-container">
                            <p>Breitensport und Rennsport bestehen schon lange nebeneinander, oft jedoch teilt dieser Umstand</p>  
                            <p>die Mitglieder im Verein. Bei einer Challenge kann jeder, unabhängig von dieser Zuordnung</p>
                            <p>teilnehmen.  Bei den Reihungen in den Ergebnislisten findet man sich in bekannter Gesellschaft</p>
                            <p>von Freunden, Bekannten oder auch Neueinsteigern verschiedenster Vereine.</p>
                            <br>
                            <p>Die veranstaltete Challenge beschränkt sich nicht auf Rudervereine allein.  Jeder der dabei sein will,</p>
                            <p>ist willkommen und findet seinen Platz.  Teilnehmer aus aller Welt sind so willkommen.</p>
                            <br>
                            <p>Als veranstaltender Verein „Linzer Ruderverein ISTER“ haben diese Veranstaltungen natürlich</p>
                            <p>Bezug zum Rudern, insbesondere die Winterchallenge an den Concept2 Ergometern wird auch an die Fitness Clubs getragen.</p>
                            
                            <p>Wenn du dabei sein willst, eine E-Mail Nachricht reicht aus.</p>
                            <p><strong>ERGO - Challenge</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
window.customElements.define('home-view', HomeView)
//style="margin-top:-30%;margin-left:45%;font-size:15px"