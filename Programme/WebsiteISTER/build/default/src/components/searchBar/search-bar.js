import { LitElement, html } from "../../../node_modules/@polymer/lit-element/lit-element.js";
import "../../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "../../../node_modules/@polymer/paper-item/paper-item.js";

class SearchBar extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  changeWebsite() {
    window.location.replace('http://www.ister.at/Ister1/');
  }

  changeContent(content) {
    let elem = null;
    console.log('entered changeContent: ' + content);
    let mainComp = this.shadowRoot.getElementById('components');
    mainComp.removeChild(mainComp.childNodes[0]);

    switch (content) {
      case 'person':
        elem = document.createElement('person-ranking');
        mainComp.appendChild(elem);
        break;

      case 'club':
        elem = document.createElement('club-ranking');
        mainComp.appendChild(elem);
        break;

      case 'distance':
        elem = document.createElement('distance-form');
        mainComp.appendChild(elem);
        break;

      case 'home':
        elem = document.createElement('home-view');
        mainComp.appendChild(elem);
        break;

      case 'ergo':
        elem = document.createElement('ergo-challenge');
        mainComp.appendChild(elem);
        break;

      case 'login':
        elem = document.createElement('login-form');
        mainComp.appendChild(elem);
        break;

      default:
        break;
    }
  }

  render() {
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
            `;
  }

}

window.customElements.define('search-bar', SearchBar);