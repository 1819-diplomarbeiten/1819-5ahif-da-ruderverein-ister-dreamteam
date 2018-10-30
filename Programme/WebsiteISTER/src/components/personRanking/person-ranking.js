import {LitElement, html} from '@polymer/lit-element'
//import '../../rest/dataService.js'
class PersonRanking extends LitElement{
    static get properties(){
        return {
            path: String,
            dropDownYear: Number,
            dropDownResult: Number,
            dropDownSequence: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost:8080/testclienttest/rs/sql/';
        //this.email = 'E Mail';
        //this.tableHeaders = ['First Name', 'Last Name', 'Best Four', 'Round One', 'Round Two', 'Round Three', 'Round Four', 'Round Five', 'Round Six'];
    }

    /*createNewElement(elementType, content){
        var temp = document.createElement(elementType);
        temp.innerText = content;
        return temp;
    }

    createNewRow(rowType, datas){
        let t_tr = document.createElement('tr');
        if(rowType == 'th'){
            for(var j = 0; j < this.tableHeaders.length;j++){
                t_tr.appendChild(this.createNewElement('th', this.tableHeaders[j]));
            }
        }
        else{
            t_tr.appendChild(this.createNewElement('td', datas.firstName));
            t_tr.appendChild(this.createNewElement('td', datas.lastName));
            t_tr.appendChild(this.createNewElement('td', datas.bestFourDistances));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundOne));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundTwo));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundThree));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundFour));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundFive));
            t_tr.appendChild(this.createNewElement('td', datas.allSixDistances.roundSix));
        }
        return t_tr;
    }

    allBestFourDistances(){
        let t_table = this.shadowRoot.getElementById('distanceTable')
        let t_thead = document.createElement('thead');
        let t_tbody = document.createElement('tbody');

	    fetch(this.path + 'bestFourDistances', {
            method: 'GET',
            mode: 'no-cors'
        }).then((resp) => resp.json())
        .then(data => {
            //Header Declaration
            t_thead.appendChild(this.createNewRow('th', null));
                
            //Body Declaration
			for(var i = 0; i < data.length;i++)
			{
                t_tbody.appendChild(this.createNewRow('td', data[i]))
            }
            t_table.appendChild(t_thead);
            t_table.appendChild(t_tbody);
			}
		)
		.catch(function(error){
            console.log('Error loading data')
        })
    }*/

    getDistances(){
        this.dropDownYear = this.shadowRoot.getElementById('dropDownYear').value
        this.dropDownResult = this.shadowRoot.getElementById('dropDownResult').value
        this.dropDownSequence = this.shadowRoot.getElementById('dropDownSequence').value

        fetch(this.path + "bestFourDistancesParticipants/" + this.dropDownYear + "/" + this.dropDownResult + "/" + this.dropDownSequence, {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            if(this.dropDownResult == '0')
                this.createPdfTotal(data)
            else
                this.createPdfSingleRound(data)
        })
    }

    createPdfSingleRound(result){
        var doc = new jsPDF()
        var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAABBCAYAAADln4cQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAABNESURBVHhe7V0LkFzFdV1sIGXjOB8bVYUUMcH6Ywsig0hwCAQsFAQVO1aSqlAlAQYnQThOuZAEwiBhDMEYKbYMwlQZJEPsgiJEpmIIThwITkIwlgIloV3t/zv735n9zOz8d0/u7df37X09782MtKtdlJpen+rue869t+fNff36rb1yHU6hdvToURw6dMhHJpOxTK2dzFZ3zpoWnPPp6VMCiy7N4+w1OR+/cdlUqK6GOcLHrkBTUxPq6s5rRN0SqpYaanBx5krU19fXiqSGMqgVSQ0VIUVy/lV5a5w+ThyPT5j2RHIKZpt7vnCq5A7Tko2KZNGiRahbutYVTalexna+VHNil7nDLdWcjF1EabnXfjSW3P4aFBfwY43mZCzzSlqtsQjk1lzIfFbXSGscztdqu9bSeE5ze0VSV1dHWr9ISMBJlhY9kRlbJxn7HPWcxOVNDOZkbrXc+/HZ7nBiD8QXWxhnfbRvtbm1VvsH4iudjhPglG8gvtJyH5Vb24zWsZfktnbD6dyaE63tK+XW2oCOfWtFMsP5dh1f6XScAKd8A/GVlvuo3NpmtI69JLe1G07n1pxobV8pt9YGdOwbWiTcM0TEvYzt3A+g7TJ3uJLtLAxRWu61H439D6Xtlgv4sUZzMpZ5Ja3WWARyay5kPqtrpDUO52u1XWtpPKe5yxZJtTgenzDtieQUzDb3fOFUyR2mJVtpkdRQg4MTetwEOLFXw+m5RpSWe83pubZXw7nzSlqtqcSVm2t7NZyrcTkXrlbPXZ9KnKthhBYJCfiZ5h5k9FgfjPiZ5vImRsTByI/PdocTeyC+2MI466N9q82ttdo/EF/pdJwAp3wD8ZWW+6jc2ma0jr0kt7UbTufWnGhtXym31gZ07BtWJCJY5jjpsXDch31RojG95dx4As2x1vjo+Epbwtl4blzxq5TbaCSemnNciSHQcTRXMa7tozSmd+cqPiOQ27H7OjX2tbb3NQp+LkKUlue1nYR7iSd2HV/pdJwAp3wD8ZWW+6jc2ma0jr0kt7UbTufWnGhtXym31gZ07BtaJNwzRMS9jN25tlfD6blGlJZ7zem5tlfDufNKWq2pxJWba3s1nKtxOReuVs9dn0qcq2GEFolA5kpcMtf2ajg914jScq85Pdf2ajh3XkmrNe68HBemFXs1nKsJm2uU07o+lThXYxG9k1SL4/EJ055ITsFsc88XTpXcYVqyndDjxn9eabvMHY7PDXoeiigt99qPxv4zVNstF/BjjeZkLPNKWq2xCOTWXMh8VtdIaxzO12q71tJ4TnOHFgkJOIl7kNFjfTDiJC5vYkQcjPz4bHc4sQfiiy2Msz7at9rcWqv9A/GVTscJcMo3EF9puY/KrW1G69hLclu74XRuzYnW9pVya21Ax761IpnhfLuOr3Q6ToBTvoH4Sst9VG5tM1rHXpLb2g2nc2tOtLavlFtrAzr2VUVywbo+nLms28NyRlfEWM+pF1uJ1uWs3dfZ8TLWiY9Ax2Aoe4CzdokRytk592YsUNoouwGNfV+X47keMyeQue2jON/m2i3n+3Y4McTOED93bvsoTmxaKxqxE047c4lXJG29eRzryhG41+McGg20XXP54+Bk7MHjZ+KXaoPxGozO05ZqPDSQjXUe54HnbJ+Zh2lmxjMIahgzOi/fzPpd7czcyxfOMeRzi87ThscLxhG9fG4PshaZa62O4/JhGl7bx5es8IpkanoaU9MAdbPGicRhHw2X033UmHuB5rTNnZfT6T5MoxFlr8QJRKO1YT4uHwaXq+THtigNj1eutI+baZ6dAk0W7jY2MXcqNfkyopp8UQvdFrRIOKVcKAavYJp+9K7GTY/Fh5v4adB/AhppHNf7meGN3ullrCF23XjK0D7uWPcGxnOmaTtDayWWti1U84tkamqKFkIXcR7BxZAtTGFwPIu2/jSaYlk09eTQHMsgFk8jmS2gSFcpyrdnOIefvhXHjm+3YctDnXj8hz040pZCS3cSh5sGkSL/ML/YSAbNvVnKM4mWWJKQotwZQs6sQezNbO/JonMwg3R+yvjqODle+0QOrb20dtJ5/hTb+HLcpI2bpc+TRa4Yfo2z+SLFUddA4vSmbKw0jXMYiOeRyQXXMR9Y2J2EkC0U0dk3gVvubMT5V/bjNy8bwiWfbcarbw5hNJVFgYvEk/stkyviJ/8Tx3W3NmHbw614/VAc9R1p7HuhHbdsP4bV1x/Dzkc7MTCaR9H6cONI/EV98a4GfGZTB77y4DF84/G3sf2Ro1h5TQ/ljuO8K4ZwK/EPPnYI9+15F9d9sQufv+0oFUKWvhwbiBoP87T2vpFJbLqjidbeZ9b+exuO4p7d7+Ab332HYhzB5vs6sOKaZmze2Yj+kVzJZzFxqEhae0Zx09Y2ijNMcRJY/cdduGfXETxEcW7c0oDla2NYdV0P7trVi97hvFmLXs/JbPNfJJyHK5SHFhm6I2+7txG/fOEovZdP4sL1DWigL513kdI2jcbuLNbeNIjL/6IdP3s7icnMFArFaUykCnSx09h4RyN27GkxRcIh/I9G/STlunnLW/jOM91oJ21iPIeDDZP47SvjOG1JHmddmKFiG0PfUAbDiRxefDWBW7cdRBvtFnIHm1A2brYwjdt2dODDF47T2jO44oYmHG5OIk67Y2wgiS4qrrt3t+PL972NGO1IshT/w3PHcahQ/uqeGD50YZbiFPCpzw3hcCOvj3aWrkncdFc/fuV3xvCrq8fxtw90042Vibg+c98WpEjMxeahZwHtoLj9viYqkgn6ojK46Pp6+rKzMxeUGnt4a5zGW/VZnP+H4zh7TQLbd/egayDj7TjE84V788gIXvjXVowm6c4lF30teSfZ99whtHYmUKCC4dZEr3wfvypBX06R1pDFcy8nkabCY9+xZB5PP38Ig/T400UiMbMU4m/u78SHL+K1Z3H1xiaz66SpeA68Uo/4aAbvto5i7zMHTQxOaVw5gIlnOrP+2+7toyLJmXWs2TCE9hg9LumHuSeeH8Ki3x2jHEUqxC56nKZQpBtj5ofWa3/mui3o40YaPe69Irlo3C8Sfsbzx5ZmPj6dm7gdaU3TnRbDGSty9OWkccG6duzaP4JfvDtO55Ap8ziamMyV3mn0Gem6IsUcFYtnAxo7czjfL5I0FcmEKRJDEz+ZzmHKjWUbF7gukqs2tlKR5PDf74zjjgcaaPegRyblSoxTIZsziXXkRhMuPF5TsEiASzfE0RErGn2OBF/d04df+5R3E/3JX7ehpTNl1sQ/dErhYKY/qUWyEAdXQY4+7O338eNmDHWLqUiuq0dzd8a/c12k0kXsfrIHy9bGcfqKNN63NItfvziNT6wfxY1b+/Hj18fRS89/fgSJj8QKi8k7iSmSxQV8aFUOz71EjzDK4erCkKW1c5HwLli3OEs7QAcOvDaOm7YN0FmmDd19vJtRXv5CHV8NLpLNO/hxQ0WyeJo+Sxwv/2cKh+oz2PN0HEuuHsDiq4ewcWsf/uvQGBVxkW4CPsR6CIs5V1iwnYTT0XUxdZ+nwZe+xjsJFQndjRfRwdN93LCWwY7TNBhPFfHqz1O49uZ2+oISplDevyyPD3wig3MuG8HXHhvE4Kh3J1Zqzfxbxav4PMQ7SQ7P8uOGisQ0DiBQjTcitvBO8uWveztJHZ1plq+L4auPDmHFum5cs6mdzg55s16+vmb9Ea1I/OYdvJPw32RP4bwrx3DjnT1Yua6XdpAUTl+WxJ9+qRdH27J0fuF41lGvi8d6PkdtQYtEUno7SRNdaCmSBrTSThK8sN4uwE7pTB6JiTTS2SJ6h3Jo6CzikSf7sf7WQTpAjuK0pRn81uX9eOWNMfPKWK5N013Y0p3D4qvilLtgi4QeN1Qkfm69WNtkas4kX6eDKz0qee1X3NCKd1rSeP6VBP5yeyO6+6nYSex9lmCh8JjBXJHWcfvOGN0ofHCdxurPJXDwaJYO4CP4yMV8XQo4+5IEvv2DUYxOqOLngUz0eA7bvBcJXS7zo5sUSWAnCSkSvtv4p7kriRd+EsPYxMyrYJJ2lrZYFrv3DeHcP4jjgxcM48HHO+gskLf+EY2cW+hx4xbJJG3nJjdfFx6Y61O6dvO4sUXiHVxb6E2I3myGsnh470H0D3lvaZ0x+tKPdNOjkl+DgzE4Nmtu39lri2QKaz4/TAfXPH2mDG74SgwfXDVJxU871TXDePalhNlJzYr4mtiz2sw657YtWJHIDzfzuLFFIgfXFvW48e5AUQO/qE9j/Rea8L/HJpGjtwhp/AhIpKZwLe0oiy6J0QF0wJwtKrUm87iRg2vevN1wkfCB0lx0e228FXuHQ1kNr33m4JrDZzY2or2Pf3FGZ522AWSyBSToDelb+5rw8uudmEjT48ccNIONc23e2UPXwPsnQC7dMEIH14I5V715eAKrPzuA05fTI3V5kbgB/MfBpNkl+cZhnMy2gEXCF5sPXTAX7uZtzXRoHML7loxh+dpGvN2YQt68DZDWQtrPj2bozu/HtV/owJP/2I/GdjpD0CtSMl2gbT6GT/9ZI+7fO4iBEdppIp42HI7vXv4yX3srjo9dPkBfcgpnfXIcTzw3grFUwStMm9dbs/fjvUXw2qfNF7VpazutPU5rn8Cq69vxg3/uxatv9uHVN3pw4N+HcOvdvfj9P+/GG28nkaN1cgxpHIPXkUjlsWlLB85a5b3hfXJ9L+pbM+Y1N03PtGf/ZQQr/6gPZyyfwC+tiOP6WxrQ2MGvwd46TEReq13vXLb5LxJKwx+KB1wgY6kcDjcPYs8/dOKu3X3Y8s1Beg530aG0D/0jSfPayD/k4F/cxvYUHnisB995egAP7m2jA18z7vi7Lmzf1YKHnmjBsz/uR99wli5+8AvRTb6cVnoM/NO/teHePTFseWQQ23YN4IcvddM5J0EF4P1anxufXcyCeUqQtdd3xPH3+zvJr5/8h3D3t/qw+6kmWtsRwrvY9VQbdjzaj4e/N2B+ATbF251qvIbRZIZ2RboGz3Tgzt0DFGeYrkE3XjvUj4HEJO1WRboBinj6RwMUfwBbaZ337+3Ezw72IUmv8//visRt/AH59xqjdOcmkkXE6VDGB7Mkbff8y66wZeXpdD+aLNAFIu14AYPxHCGPoQQdaGnunSeq+zz8379M0A40anMnCBOTBe+O50oo08za80WM0VrYz/hTnFE6K41O5MiWI1vB2MfIXlCPRt349ThN12Ccr4FdQ4L8UnQw5yISL/5cvE7m+RoJf7LbghdJrb33m18kC/nLtBre2/CL5MBPE9j/4ojBvh8NYz+Be4MDw3iKYGzUf19x+2nONu7Fx/dVPoHeQtsEPPeheB2X12LWoDjR6nVqzqzTsfu8qw2xSx+Vm8dhc2MLiy822wfANsfOOgMZO73RKEReB21z/Wgumv0vevg+4Zxzl3lFcumGFD5ycdJiwkKPZ/BR0wsXrpk9ysVNOmuYa1STuxrM9TVy45RfZ7A/MXyU/N//geVekSxdK/8T+hpqcFD6dzc11OBgpkhoJ1lMhVJDDS5qO0kNFVErkhoqIlgkNdSgEVUkYX+EbeD+gbHqNS9/nOxzUfEsAv9Wl6MN8wnl1NoCXLk40kdoS3zUOgOck1sQGYdt0gvnaEt8Qq6R2P2xQmQctknvxPN9LG/GJUVCxsVWxOCxWZyd67Fwprc2zS+xnMx9LWscXYCzdh3f11pobla5GZqzNh1f63QczWlfHV9rjUbrGJbTNjN37TQPxFGcnuuxaH0fx8/NEdAqe/jB1QWLw8ZqzpVYwkdpuXd0xqY0mgvMNSw3q9yKi7TreTXaCK5sbhdhOrGVixHBVZVba7U99HFjjQFhGKrRCOZaK5qFWOdC5hbMZ27mCOFFIohw8jl3Xknrcnqu7S7nIkob5iNzl9NzbXc5dx6l1RrNaY22u9ooTs9dH+G0RnNao+3Vai1qO4ngvZ5bMJ+5mSMED65C8pifTxEwOu4J/jPPQvx8/zJaBtvCtLrX8HNTHxbPcDI+wXUG7Ao6t8u5ONFrFLAruNpyONHcge+Cx8QxSg6ugVciOu3y2ECNhePe/2esLc/BfQ2PtVbHs/BfgZmzPjq+q9ecmzug4bHWuhrprSaQW/U+bBy/V/aAzkJry+bmse1lHojPULlFK/aAzkK03FeVW2mFN5qSnYRExtE6+4l4zE42mZkLZ7UGWisaHmutjRGA5qyPji/xjN3hAjEs7/vzWGs5vvAWvpY56yO+3IvGQMUJcDynXmvNXGlNfM3JmDke217mgfgMHUd8xE691pq51fo+mpOxxHG0ojGIKpIAbLCSsZpzkhI+Ssu9o5MFR/mEwnKzyq24SLueV6ON4MrmdhGmE1u5GBFcVbm1VttDi8QaA8IwVKMRzLVWNAuxzoXMLZjP3MwRakUieK/nFsxnbuYIUiRnLGlzBAy9/URtUc68ZKzmJVsfjf0tTtvD5hqWqz1uIsZqXlVurdV2p0i8/xt6Fiqxn4DAY51Qa8pyEVqNKC33x5VbxsKV07qcM+de5y7H6dz+3IlXlnPm3Ot4mhOtb7cIzJ14ZTlnzr3ELCmS08+l7eT8GmooxWlnUoHU4f8AtEIpgY/MnhMAAAAASUVORK5CYII='
        doc.setFontSize(18)
        doc.setFontType('bold')
        doc.text('30 (dirty) K Ergo Winter Challenge ' + this.dropDownYear, 20, 25)
        doc.addImage(img, 'PNG', 150, 15)
        doc.setFontSize(12)
        doc.setFontType('slim')
        var columns = [
            {title: "", dataKey:"position"},
            {title: "Name", dataKey:"name"},
            {title: "Gender", dataKey:"gender"},
            {title: "Class", dataKey:"pClass"},
            {title: "Club", dataKey:"club"},
            {title: "Round " + this.dropDownResult, dataKey:"round"},
            {title: "", dataKey:"empty"},
            {title: "500m", dataKey:"fiveHoundred"},
            {title: "Watt", dataKey:"watt"},
            {title: "Watt/kg", dataKey:"wattKg"},
        ]
        var rows = []
        for(var j = 0; j < result.length;j++){
            rows[j] = {"position": j + 1,
            "name": result[j].lastName + " " + result[j].firstName, 
            "gender": result[j].gender,
            "pClass": result[j].pClass,
            "club": result[j].club,
            "round": result[j].round,
            "fiveHoundred": result[j].fiveHoundred,
            "watt": result[j].watt,
            "wattKg": result[j].wattKg
            }
        }
        doc.autoTable(columns, rows, {
            margin: {top:35},
            columnStyles: {
                fontSize:5 //funzt ned
            },
            tableWidth: 'auto'
        });
        doc.save('PersonChallenge.pdf')
    }

    createPdfTotal(result){
        var doc = new jsPDF()
        var img = 'data:image/png;base64,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'
        doc.setFontSize(18)
        doc.setFontType('bold')
        doc.text('30 (dirty) K Ergo Winter Challenge ' + this.dropDownYear, 20, 25)
        doc.addImage(img, 'PNG', 150, 15)
        doc.setFontSize(12)
        doc.setFontType('slim')
        var columns = [
            {title: "", dataKey:"position"},
            {title: "Name", dataKey:"name"},
            {title: "Gender", dataKey:"gender"},
            {title: "Class", dataKey:"pClass"},
            {title: "Club", dataKey:"club"},
            {title: "One", dataKey:"roundOne"},
            {title: "Two", dataKey:"roundTwo"},
            {title: "Three", dataKey:"roundThree"},
            {title: "Four", dataKey:"roundFour"},
            {title: "Five", dataKey:"roundFive"},
            {title: "Six", dataKey:"roundSix"},
            {title: "Best", dataKey:"bestFour"},
            {title: "Total", dataKey:"total"},
        ]
        var rows = []
        for(var j = 0; j < result.length;j++){
            rows[j] = {"position": j + 1,
            "name": result[j].lastName + " " + result[j].firstName, 
            "gender": result[j].gender,
            "pClass": result[j].pClass,
            "club": result[j].club,
            "roundOne": result[j].allSixDistances.roundOne,
            "roundTwo": result[j].allSixDistances.roundTwo,
            "roundThree": result[j].allSixDistances.roundThree,
            "roundFour": result[j].allSixDistances.roundFour,
            "roundFive": result[j].allSixDistances.roundFive,
            "roundSix": result[j].allSixDistances.roundSix,
            "bestFour": result[j].bestFourDistances,
            "total": this.calculateTotal(result[j].allSixDistances)}
        }
        doc.autoTable(columns, rows, {
            margin: {top:35},
            columnStyles: {
                fontSize:5 //funzt ned
            },
            tableWidth: 'auto'
        });
        doc.save('PersonChallenge.pdf')
    }

    calculateTotal(allSix){
        return allSix.roundOne + allSix.roundOne + allSix.roundThree + allSix.roundFour + allSix.roundFive + allSix.roundSix;
    }

    render(){
        return html`
        <!--bootstrap and node js-->
        <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <!--jspsf-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
        <script lang="javascript" src="/node_modules/jspdf/dist/jspdf.min.js"></script>
        <script lang="javascript" src="/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js"></script>
        <script lang="javascript" src="/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js"></script>
        <!--styling-->
        <link rel="stylesheet" type="text/css" href=/src/components/personRanking/styles.css></link>
        <div class="mainPos">
            <h1>30K Person Ranking List:</h1>
            <h3>Wählen Sie ihre gewünschten Filteroptionen</h3>
            <div class="dropdown">
                <form>
                    <div class="form-group">
                        <p>Year</p>
                        <select id="dropDownYear" class="form-control">
                            <option value="2017">2017 / 2018</option>
                            <option value="2016">2016 / 2017</option>
                            <option value="2015">2015 / 2016</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>Result</p>
                        <select id="dropDownResult" class="form-control">
                            <option value="0">Total</option>
                            <option value="1">1st Session</option>
                            <option value="2">2nd Session</option>
                            <option value="3">3rd Session</option>
                            <option value="4">4th Session</option>
                            <option value="5">5th Session</option>
                            <option value="6">6th Session</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <p>Sequence</p>
                        <select id="dropDownSequence" class="form-control">
                            <option value="Alphabetic">Alphabetic</option>
                            <option value="TopDown">TopDown</option>
                            <option value="Categories">Categories</option>
                        </select>
                    </div>
                </form>
			</div>
            <br>
            <input type ="button" value="Download pdf" class="btn btn-primary" @click="${() => this.getDistances()}"></input>
        </div>
        `
    }
}
window.customElements.define('person-ranking', PersonRanking)