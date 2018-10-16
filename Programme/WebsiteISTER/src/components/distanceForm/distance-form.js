import {LitElement, html, property} from '@polymer/lit-element'

class DistanceForm extends LitElement{
    static get properties(){
        return{
            path:String,
            distance: Number,
            evidencePic: Image
        }
    }

    handleClick() {
        let selectItem = this.shadowRoot.getElementById('distance');
        console.log(selectItem)
        console.log(selectItem.value)
      }

    postPeriod(){
        this.distance = this.shadowRoot.getElementById('distance').value;
        console.log(this.distance);

        fetch(this.path + 'post',
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"distance": this.distance, "img": this.evidencePic})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }

    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/';
    }
    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        return html`
            <link rel="stylesheet" type="text/css" href=/src/components/distanceForm/styles.css>
            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <input id="distance" type="text" placeholder="Enter Distance" value="1234"/><br><br>
                <input id="evidencePic" type="file" name="Beweisbild auswählen" accept=".png, .jpg, .jpeg"/></br><br>
                <button type="submit" @click="${() => this.postPeriod()}">Submit</button>
            </div>
        `
    }
}
window.customElements.define('distance-form', DistanceForm);