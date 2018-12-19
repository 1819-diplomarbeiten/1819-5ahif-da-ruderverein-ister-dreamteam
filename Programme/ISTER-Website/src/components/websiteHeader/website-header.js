import {LitElement, html} from '@polymer/lit-element'

export default class WebSiteHeader extends LitElement{
    static get properties(){
        return {
            path: String
        }
    }
    constructor(){
        super();
        this.path = 'http://localhost/restApi/rest'
    }

    changeLanguage(language){
        console.log(language + ' selected as language')
    }

    countdown(){
        fetch(this.path + '/actualchallengetime.php', {
            method: 'GET'
        })
        .then((resp) => resp.json())
        .then(data => {
            var x = setInterval(_ => {
                var distance = data.time - new Date().getTime();
                
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                hours = this.zeroChecker(hours, 'hour')
                minutes = this.zeroChecker(minutes, 'minute')
                seconds = this.zeroChecker(seconds, 'second')
                this.shadowRoot.getElementById('countdown').innerHTML = '<span><strong>THE CHALLENGE ' + data.state + ' &rarr;</strong></span>  ' + days + '<span class="highlight"> Days</span> ' + hours + ' <span class="highlight">Hours</span> ' + minutes + ' <span class="highlight">Minutes</span> ' + seconds + ' <span class="highlight">Seconds</span>'
            }, 994);
        })
    }

    zeroChecker(nr, mode){
        if(nr.toString().length == 1)
            return "0" + nr.toString();
        else 
            return nr;
    }

    formatState () {
          var $state = $(
            '<span><img src="images/germanFlag.png" class="img-flag" /> ' + 'seas' + '</span>'
          );
          return $state;
    }

    render(){
        window.onload = () => {
            this.countdown()
            
        }
        $(document).ready(() => { 
            /*console.log(this.shadowRoot.getElementById('social'))
            console.log(window.Select2)
            $(this.shadowRoot.getElementById('social')).select2({
                templateResult: $(this.formatState())
               });*/
        }) 
        return html`
            <script lang="javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script lang="javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>-->
            <div class="background">
                <link rel="stylesheet" type="text/css" href=/src/components/websiteHeader/styles.css>
                <h1 class="header" id="countdown"></h1>
                <div class="languages">
                    <!--<select id="dropDownSequence" class="form-control" style="width:60px">
                        <option value="english"><img src="images/englishFlag.png"></option>
                        <option value="german"><a style="background-image:url(images/germanFlag.png);height:10px;width:10px" class="img-thumbnail" href=""> </a></option>
                    </select>-->
                    <img src="images/germanFlag.png" width="70" height="35" @click="${() => this.changeLanguage('german')}">
                    <img src="images/englishFlag.png" width="70" height="35" @click="${() => this.changeLanguage('english')}">
                    <!--<select id="social" class="form-control" style="width:60px">
                        <option value='german'>Deutsch</option>
                        <option value='english'>English</option>
                    </select>-->
                </div> 
            <div>
        `
    }
}
window.customElements.define('website-header', WebSiteHeader)