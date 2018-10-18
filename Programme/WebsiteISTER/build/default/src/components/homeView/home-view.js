import { LitElement, html } from "../../../node_modules/@polymer/lit-element/lit-element.js";

class HomeView extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
            <link rel="stylesheet" type="text/css" href="/src/components/homeView/styles.css"></link>
            <div class="mainPos">
                <img src="src/components/homeView/homeView.jpg" width="500" height="333">
                <h1>Willkommen zur ERGO-Challenge Seite des Linzer Rudervereins ISTER</h1>
                <p>Breitensport und Rennsport bestehen schon lange nebeneinander, oft jedoch teilt dieser Umstand die Mitglieder im Verein.  Bei einer Challenge kann jeder, unabhängig von dieser Zuordnung teilnehmen.  Bei den Reihungen in den Ergebnislisten findet man sich in bekannter Gesellschaft von Freunden, Bekannten oder auch Neueinsteigern verschiedenster Vereine.</p>
                <br>
                <p>Die veranstaltete Challenge beschränkt sich nicht auf Rudervereine allein.  Jeder der dabei sein will, ist willkommen und findet seinen Platz.  Teilnehmer aus aller Welt sind so willkommen.</p>
                <br>
                <p>Als veranstaltender Verein „Linzer Ruderverein ISTER“ haben diese Veranstaltungen natürlich Bezug zum Rudern, insbesondere die Winterchallenge an den Concept2 Ergometern wird auch an die Fitness Clubs getragen.</p>
                <br>
                <p>Wenn du dabei sein willst, eine E-Mail Nachricht reicht aus.</p>
                <br>
                <p>ERGO - Challenge</p>
            </div>
        `;
  }

}

window.customElements.define('home-view', HomeView);