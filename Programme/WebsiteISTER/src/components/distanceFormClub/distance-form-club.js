import {LitElement, html} from '@polymer/lit-element'
//import { xlsx } from 'xlsx'
class DistanceFormClub extends LitElement{
    static get properties(){
        return {
            path: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/'
    }

    postPeriods(){
        console.log('entered postPeriods')
        var f = this.shadowRoot.getElementById('excelFile').files[0]
        console.log(f)
        var file = f;
        var fileReader = new FileReader();
        fileReader.onload = (e => {
            var filename = file.name;
            // pre-process data
            var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            // call 'xlsx' to read the file
            var workbook = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
            console.log(workbook);
            workbook.SheetNames.forEach(sheetName => {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var jsonObj = JSON.stringify(XL_row_object);

                console.log(jsonObj)

                fetch(this.path + 'postPeriods',
                {
                    method: "POST",
                    body: jsonObj,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                //postPeriods(jsonObj)
                //console.log(this.clubTable);
              })
        });
        fileReader.readAsArrayBuffer(file)
    }

    /*postPeriods(jsonObj){
        console.log(jsonObj)
    }*/

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        console.log('entered render')
        return html`
            <!--Bootstrap and Node js-->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <!--Read excel-->
            <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.7/xlsx.core.min.js"></script>-->
            <script lang="javascript" src="/node_modules/xlsx/dist/jszip.js"></script>
            <script lang="javascript" src="/node_modules/xlsx/dist/shim.min.js"></script>
            <script lang="javascript" src="/node_modules/xlsx/dist/xlsx.full.min.js"></script>
            <!--Styling-->
            <link rel="stylesheet" type="text/css" href=/src/components/distanceFormClub/styles.css>

            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <h3>This is how the Excel should look like (.xlsx Format):</h3>
                <table class="table table-hover">
                    <thead width="300">
                        <tr>
                            <th></th>
                            <th>A</th>
                            <th>B</th>
                        </tr>
                    </thead>
                    <tbody width="300">
                        <tr>
                            <td>1</td>
                            <td>Email</td>
                            <td>Distance</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>your.email@gmail.com</td>
                            <td>6789</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>another.email@gmx.at</td>
                            <td>7870</td>
                        </tr>
                    </tbody>
                </table>
                <input id="excelFile" type="file" name="Excel auswählen" accept=".xlsx"/></br><br>
                <button type="submit" @click="${() => this.postPeriods()}">Submit</button>
            </div>
        `
    }
}
window.customElements.define('distance-form-club', DistanceFormClub)