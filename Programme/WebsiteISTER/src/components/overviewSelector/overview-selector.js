import {LitElement, html} from '@polymer/lit-element'

class OverviewSelector extends LitElement{
    static get properties(){
        return {
            
        }
    }
    constructor(){
        super();
    }
    
    changeWebsite(){
        window.location.replace('http://www.ister.at/Ister1/')
    }

    changeContent(content){
        let elem = null
        //console.log('entered changeContent: ' + content)
        let mainComp = this.shadowRoot.getElementById('components')

        //removes all children
        while (mainComp.firstChild) {
            mainComp.removeChild(mainComp.firstChild);
        }

        //Set the next "main" component
        switch(content){
            case 'person':
                elem = document.createElement('person-ranking')
                mainComp.appendChild(elem)
                break
            case 'club':
                elem = document.createElement('club-ranking')
                mainComp.appendChild(elem)
                break
            case 'distance':
                elem = document.createElement('distance-form-club')
                mainComp.appendChild(elem)
                elem = document.createElement('distance-form-participant')      //added
                mainComp.appendChild(elem)                                      //added
                elem = document.createElement('p')                              //added
                elem.setAttribute('style','margin-top:45%')                     //added
                elem.innerHTML = '(Normalerweise nur eines von beiden sichbar)' //added
                mainComp.appendChild(elem)                                      //added
                break
            case 'home':
                elem = document.createElement('home-view')
                mainComp.appendChild(elem)
                break
            case 'ergo':
                elem = document.createElement('ergo-challenge')
                mainComp.appendChild(elem)
                break
            case 'login':
                elem = document.createElement('login-form')
                mainComp.appendChild(elem)
                break
            case 'challengeCreator':
                elem = document.createElement('challenge-creator')
                mainComp.appendChild(elem)
                break
            default:
                break
        }
    }

    render(){
        return html`
            <link rel="stylesheet" type="text/css" href=/src/components/overViewSelector/styles.css>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <div class ="background">
                <div class="banner">
                    <p>Ergo Challenge ISTER Linz</p>
                </div>
                <div class="componentSelection">
                    <div class="singleComponent">
                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('home')}">Home</button>
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('ergo')}">30K Ergo Challenge</button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Second group">
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('club')}">30K Club Ranking</button>
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('person')}">30K Person Ranking</button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Third group">
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('distance')}">Add Distance</button>
                                <button type="button" class="btn btn-primary" @click="${() => this.changeWebsite()}">LRV Ister</button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Fourth group">
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('login')}">Login</button>
                                <button type="button" class="btn btn-primary" @click="${() => this.changeContent('challengeCreator')}">Create Challenge</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="components">
                <home-view></home-view>
            </div>
            `
    }
}
window.customElements.define('overview-selector', OverviewSelector);