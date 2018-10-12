import {LitElement, html} from '@polymer/lit-element'

class ErgoChallenge extends LitElement{
    static get properties(){
        return{
            sth: String
        }
    }
    constructor(){
        super();
    }

    render(){
        return html`
            <link rel="stylesheet" type="text/css" href="/src/components/ergoChallenge/styles.css"></link>
            <div class="mainPos">
                <h1>30 (dirty) K Ergo Challenge</h1>
                <img src="src/components/ergoChallenge/ergo_challenge.jpg" width="500" height="333">
                <h2>Allgmeines:</h2>
                <p>Bei diesem Bewerb gibt es weder etwas zu gewinnen, noch erhält man eine Medaille.  Alle Ruderer, weiblich und männlich aus Vereinen oder privat, sind startberechtigt und als Administrator vertrauen wir auf die Richtigkeit der gelieferten Daten.</p>
                <h2>Bewerb:</h2>
                <p>Die Teilnehmer sollen versuchen in der Zeit von 30 Minuten so viele Meter am Ergometer zurück zu legen, als es ihnen möglich ist.  Es gibt über den Winter verteilt sechs (6) Termine, wobei die vier (4) besten Ergebnisse gewertet werden.</p>
                <p>Die Termine sind immer von Donnerstag 18:00 Uhr bis Montag 18:00 Uhr berechnet.</p>
                <ul>
                    <li>1. Session: 01. – 05.11.2018</li>
                    <li>2. Session: 22. – 26.11.2018</li>
                    <li>3. Session: 13. – 17.12.2018</li>
                    <li>4. Session: 10. – 14.01.2019</li>
                    <li>27.01.2019 ==> Austrian Indoor Rowing Championships</li>
                    <li>5. Session: 21. – 25.02.2019</li>
                    <li>6. Session: 14. – 18.03.2019</li>
                </ul>
                <h2>Ziel:</h2>
                <p>Bei vier Termine zusammengerechnet, mindestens 30 000 Meter (Männer) oder 26 000 (Frauen) zu rudern und dabei mit Ruderkollegen aus Österreich und der Welt messen.</p>
                <h2>Daten:</h2>
                <p>Um in die Reihung aufgenommen zu werden, benötige ich Geburtsjahr, Körpergewicht und ein Fotos des Monitors.  Anschließend Übermittlung der Daten per E-mail an challenge@ister.at.  Es können auch vereinsinterne Listen (30K Ergebnisse Liste) verwendet werden.  Vertrauen steht im Vordergrund. Die Reihung erfolgt gemäß der Concept2 Alterseinteilung.</p>
                <ul>
                    <li>SchülerInnen: bis 14 Jahre</li>
                    <li>JuniorenInnen: 15 – 16 Jahre</li>
                    <li>JuniorenInnen: 17 – 18 Jahre</li>
                    <li>Allgemeine Klasse: 19 – 29 Jahre</li>
                    <li>Masters A: 30 – 39 Jahre</li>
                    <li>Masters B: 40 – 49 Jahre</li>
                    <li>Masters C: 50 – 59 Jahre</li>
                    <li>Masters D: 60 – 69 Jahre</li>
                    <li>Masters E: 70 – 79 Jahre</li>
                    <li>Masters F: 80 – 89 Jahre</li>
                </ul>
            </div>
        `
    }
}
window.customElements.define('ergo-challenge', ErgoChallenge)