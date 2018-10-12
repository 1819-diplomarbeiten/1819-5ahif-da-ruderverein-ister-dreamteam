import {LitElement, html, property} from '@polymer/lit-element'

class DistanceForm extends LitElement{
    static get properties(){
        return{
            path:String,
            distance: Number,
            evidencePic: Image
        }
    }

    postPeriod(){
        //const myRegistry = new CustomElementRegistry(window.customElements);
        //this.attachShadow({mode: 'open', customElement: {window.customElements}});
        //this.distance = this.shadowRoot.querySelector('#distance');
        /*this.distance = document.getElementById('distance');
        this.evidencePic = document.getElementById('evidencePic');
        console.log('distance ' + this.distance);
        console.log('pic ' + this.evidencePic);
        let distance = 2222;
        var evidencePic = new Image(200,200);
        evidencePic.src = 'src/components/homeView/homeView.jpg'*/
        this.distance = document.getElementById('distance');
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
        /*let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', '/src/components/distanceForm/styles.css');
        this.shadow.appendChild(link);
        let div = document.createElement('div');
        div.setAttribute('class', 'mainPos');
        let h1 = document.createElement('h1');
        h1.innerHTML = 'Enter your Distance';
        let input = document.createElement('input')
        input.setAttribute('value', '1234');
        div.appendChild(h1);
        this.shadow.appendChild(h1);
        console.log(this.shadow)
        console.log(this.shadow.firstChild)
        return this.shadow;*/
        return html`
            <link rel="stylesheet" type="text/css" href=/src/components/distanceForm/styles.css>
            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <input id="distance" type="text" placeholder="Enter Distance" value="1234"/><br><br>
                <input id="evidencePic" type="file" name="Beweisbild auswählen" accept=".png, .jpg, .jpeg"/></br><br>
                <!--<button type="submit" @click="${() => console.log('Calling method' + this.postPeriod(distance.val, evidencePic.val))}">Submit</button>-->
                <button type="submit" @click="${() => console.log('Calling method' + this.postPeriod())}">Submit</button>
            </div>
        `
    }
}
window.customElements.define('distance-form', DistanceForm);