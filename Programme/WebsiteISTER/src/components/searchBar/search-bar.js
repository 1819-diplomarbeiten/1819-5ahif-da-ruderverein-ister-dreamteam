import {LitElement, html} from '@polymer/lit-element'
import  '@polymer/paper-dropdown-menu/paper-dropdown-menu.js'
import '@polymer/paper-item/paper-item.js'

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
        console.log('entered changeContent: ' + content)
        let mainPos = this.shadowRoot.getElementById('components')
        mainPos.removeChild(mainPos.childNodes[0])
        switch(content){
            case 'person':
                elem = document.createElement('person-ranking')
                mainPos.appendChild(elem)
                break
            case 'club':
                elem = document.createElement('club-ranking')
                mainPos.appendChild(elem)
                break
            case 'distance':
                elem = document.createElement('distance-form')
                mainPos.appendChild(elem)
                break
            case 'home':
                elem = document.createElement('home-view')
                mainPos.appendChild(elem)
                break
            case 'ergo':
                elem = document.createElement('ergo-challenge')
                mainPos.appendChild(elem)
                break
            case 'login':
                break
            default:
                break
        }
        console.log(mainPos)
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
                </div>
            </div>
            <div id="components">
            </div>
            `
    }
}
window.customElements.define('search-bar', SearchBar);