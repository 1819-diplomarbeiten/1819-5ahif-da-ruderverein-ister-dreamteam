import {LitElement, html} from '@polymer/lit-element'

export default class ErgoChallenge extends LitElement{
    static get properties(){
        return{
            counter: Number,
            methodEntered: Boolean
        }
    }
    constructor(){
        super();
    }

    getChallengeSessions(){
        fetch('http://localhost:8080/testserver/rs/sql/getChallenge/1', {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            this.appendChildTo(data.roundOne)
            this.appendChildTo(data.roundTwo)
            this.appendChildTo(data.roundThree)
            this.appendChildTo(data.roundFour)
            this.appendChildTo(data.roundFive)
            this.appendChildTo(data.roundSix)
            this.methodEntered = true
        })
    }

    appendChildTo(to){
        var li = document.createElement('li')
        li.innerHTML = this.counter + '. Session: ' + this.prepareDate(to)
        this.counter++
        this.shadowRoot.getElementById('sessionList').appendChild(li)
    }

    prepareDate(to){
        var temp = to.split('-')
        return temp[2] + '. - ' + (parseInt(temp[2]) + 4) + '.' + temp[1] + '.' + temp[0]
    }

    render(){
        $(document).ready(() => { 
            if(!this.methodEntered){
                this.counter = 1
                this.methodEntered = true
                this.getChallengeSessions()  
            }
        }) 
        return html`
            <link rel="stylesheet" type="text/css" href="/src/components/overviewContent/ergoChallenge/styles.css"></link>
            <div class="mainPos">
                <div style="margin-left:2%">
                    <h1><strong>30 (dirty) K Ergo Challenge</strong></h1>
                    
                    <h2>Allgmeines:</em></h2>
                    <p>Bei diesem Bewerb gibt es weder etwas zu gewinnen, noch erhält man eine Medaille.  Alle Ruderer, weiblich</p>
                    <p>und männlich aus Vereinen oder privat, sind startberechtigt und als Administrator vertrauen wir auf die Richtigkeit</p>
                    <p>der gelieferten Daten.</p>
                    <h2>Bewerb:</h2>
                    <p>Die Teilnehmer sollen versuchen in der Zeit von 30 Minuten so viele Meter am Ergometer zurück zu legen, als</p>
                    <p>es ihnen möglich ist.  Es gibt über den Winter verteilt sechs (6) Termine, wobei die vier (4) besten Ergebnisse</p>
                    <p>gewertet werden. Die Termine sind immer von Donnerstag 18:00 Uhr bis Montag 18:00 Uhr berechnet:</p>
                    <ul id="sessionList">
                    </ul>                    
                    <img src="images/ergo_challenge.jpg" width="650" height="433" style="margin-left:50%;margin-top:-30%">
                    <p>Des weiteren gibt es am 27.01.2019 die Austrian Indoor Rowing Championships</p>
                    <h2>Ziel:</h2>
                    <p>Bei vier Termine zusammengerechnet, mindestens 30 000 Meter (Männer) oder 26 000 (Frauen) zu rudern und dabei mit Ruderkollegen aus Österreich und der Welt messen.</p>
                        <h2>Daten:</h2>
                        <p>Um an der Challenge teilnehmen zu können, muss man sich mit einer E-Mail auf dieser Website registrieren und weitere persönliche Daten wie Name, Alter, Gewicht, etc. für die Auswertung der Challenge angeben (Das Gewicht dient lediglich zur Berechnung und scheint nicht in der Auswertung auf). Ihre Daten werden vertraulich gespeichert und nicht an Dritte weitergegeben. Bei Fragen wenden Sie sich an challenge@ister.at. Die Reihung erfolgt gemäß der Concept2 Alterseinteilung:</p>
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
            </div>
        `
    }
}
window.customElements.define('ergo-challenge', ErgoChallenge)