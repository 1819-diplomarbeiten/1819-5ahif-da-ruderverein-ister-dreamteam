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
              })
        });
        fileReader.readAsArrayBuffer(file)
    }

    //zu späterer Zeit: Überprüfung ob gerade eine Challenge!
    render(){
        return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href=/src/components/overviewContent/distance/club/styles.css>

            <div class="mainPos">
                <h1>Enter Your Distance</h1>
                <h3>This is how the Excel should look like (.xlsx Format):</h3>
                <table class="table table-dark">
                    <thead width="300" class="thead-dark">
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
                <div class="form-group">
                    <label for="exampleFormControlFile1">Select Excel File</label>
                    <input id="excelFile" accept=".xlsx" type="file" class="form-control-file" id="exampleFormControlFile1">
                </div>
                <br>
                <button type="submit" class="btn btn-primary" @click="${() => this.postPeriods()}">Submit</button>
            </div>
        `
    }
}
window.customElements.define('distance-form-club', DistanceFormClub)