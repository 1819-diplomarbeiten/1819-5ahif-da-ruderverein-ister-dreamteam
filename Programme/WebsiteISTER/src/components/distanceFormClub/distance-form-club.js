import {LitElement, html} from '@polymer/lit-element'

class DistanceFormClub extends LitElement{
    constructor(){
        super();
    }

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        console.log('entered render')
        return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <link rel="stylesheet" type="text/css" href=/src/components/distanceFormClub/styles.css>
            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <h3>This is how the Excel should look like:</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>A</th>
                            <th>B</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1|</td>
                            <td>your.email@gmail.com</td>
                            <td>6789</td>
                        </tr>
                        <tr>
                            <td>2|</td>
                            <td>another.email@gmx.at</td>
                            <td>7870</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
}
window.customElements.define('distance-form-club', DistanceFormClub)