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
                    <h1><em><strong>Willkommen zur ERGO-Challenge Seite des Linzer Rudervereins ISTER</em></strong></h1>
                    <div>
                        <img src="images/homeView.jpg" width="650" height="433">
                        <div style="margin-top:-30%;margin-left:45%;font-size:15px">
                            <p><em>Breitensport und Rennsport bestehen schon lange nebeneinander, oft jedoch teilt dieser Umstand</em></p>  
                            <p><em>die Mitglieder im Verein. Bei einer Challenge kann jeder, unabhängig von dieser Zuordnung</em></p>
                            <p><em>teilnehmen.  Bei den Reihungen in den Ergebnislisten findet man sich in bekannter Gesellschaft</em></p>
                            <p><em>von Freunden, Bekannten oder auch Neueinsteigern verschiedenster Vereine.</em></p>
                            <br>
                            <p><em>Die veranstaltete Challenge beschränkt sich nicht auf Rudervereine allein.  Jeder der dabei sein will,</em></p>
                            <p><em>ist willkommen und findet seinen Platz.  Teilnehmer aus aller Welt sind so willkommen.</em></p>
                            <br>
                            <p><em>Als veranstaltender Verein „Linzer Ruderverein ISTER“ haben diese Veranstaltungen natürlich</em></p>
                            <p><em>Bezug zum Rudern, insbesondere die Winterchallenge an den Concept2 Ergometern wird auch an die Fitness Clubs getragen.</em></p>
                            <br>
                            <p><em>Wenn du dabei sein willst, eine E-Mail Nachricht reicht aus.</em></p>
                            <p><em><strong>ERGO - Challenge</strong></em></p>
                        </div>
                        
                        <!--<p>Breitensport und Rennsport bestehen schon lange nebeneinander, oft jedoch teilt dieser Umstand die Mitglieder im Verein.  Bei einer Challenge kann jeder, unabhängig von dieser Zuordnung teilnehmen.  Bei den Reihungen in den Ergebnislisten findet man sich in bekannter Gesellschaft von Freunden, Bekannten oder auch Neueinsteigern verschiedenster Vereine.</p>
                        <br>
                        <p>Die veranstaltete Challenge beschränkt sich nicht auf Rudervereine allein.  Jeder der dabei sein will, ist willkommen und findet seinen Platz.  Teilnehmer aus aller Welt sind so willkommen.</p>
                        <br>
                        <p>Als veranstaltender Verein „Linzer Ruderverein ISTER“ haben diese Veranstaltungen natürlich Bezug zum Rudern, insbesondere die Winterchallenge an den Concept2 Ergometern wird auch an die Fitness Clubs getragen.</p>
                        <br>
                        <p>Wenn du dabei sein willst, eine E-Mail Nachricht reicht aus.</p>
                        <br>
                        <p>ERGO - Challenge</p>
                    </div>
                    <div>
                        <img src="images/homeView.jpg" width="500" height="333" style="left:40%;top:30%">
                    </div>-->
                </div>
            </div>
        `
    }
}
window.customElements.define('home-view', HomeView)