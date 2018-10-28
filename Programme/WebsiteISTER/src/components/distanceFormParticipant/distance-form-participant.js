import {LitElement, html, property} from '@polymer/lit-element'

class DistanceFormParticipant extends LitElement{
    static get properties(){
        return{
            path:String,
            distance: Number,
            evidencePic: Number
        }
    }

    /*postPeriodTwo(){
        console.log('entered postPeriodTwo')
        this.distance = this.shadowRoot.getElementById('distance').value;
        this.evidencePic = this.shadowRoot.getElementById('evidencePic')
        this.shadowRoot.getElementById('evidencePic').getBase64;
        async() => {
            await fetch(this.path + 'post', {
            method: 'POST',
            body: JSON.stringify({"distance": this.distance, "img": this.evidencePic}),
            headers:{
              'Content-Type': 'application/json'
            }
            });
        }
    }*/

    postPeriod(){
        this.distance = this.shadowRoot.getElementById('distance').value;
        //this.evidencePic = this.shadowRoot.getElementById('evidencePic').value//.webkitRelativePath//.target//.value//.getBase64
        this.evidencePic = 6787656789876

        var msgJson = "{\"distance\":" + this.distance + ",\"evidencePic\":\"" + this.evidencePic + "\"}";
        
        fetch(this.path + 'postMethod',
        {
            method: "POST",
            body: msgJson,
            headers: {
                "Content-Type": "application/json"
              }
        })
    }

    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/';
    }
    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        return html`
            <link rel="stylesheet" type="text/css" href=/src/components/distanceFormParticipant/styles.css>
            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <input id="distance" type="text" placeholder="Enter Distance" value="1234"/><br><br>
                <input id="evidencePic" type="file" name="Beweisbild auswählen" accept=".png, .jpg, .jpeg"/></br><br>
                <button type="submit" @click="${() => this.postPeriod()}">Submit</button>
            </div>
        `
    }
}
window.customElements.define('distance-form-participant', DistanceFormParticipant);