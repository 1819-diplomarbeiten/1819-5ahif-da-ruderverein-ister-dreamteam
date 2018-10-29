import {LitElement, html} from '@polymer/lit-element'

class SearchBar extends LitElement{
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
            <link rel="stylesheet" type="text/css" href=/src/components/searchBar/styles.css>
            <div class ="background">
                <div class="banner">
                    <p>Ergo Challenge ISTER Linz</p>
                </div>
                <div class="componentSelection">
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('distance')}">Distance</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('home')}">Home</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('ergo')}">30K Ergo Challenge</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('club')}">30K Club Ranking</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('person')}">30K Person Ranking</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeWebsite()}">LRV Ister</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('login')}">Login</p>
                    </div>
                    <div class="singleComponent">
                        <p @click="${() => this.changeContent('challengeCreator')}">Create Challenge</p>
                    </div>
                </div>
            </div>
            <div id="components">
                <home-view></home-view>
            </div>
            `
    }
}
window.customElements.define('search-bar', SearchBar);