import {LitElement, html} from '@polymer/lit-element'
import  '@polymer/paper-dropdown-menu/paper-dropdown-menu.js'
import '@polymer/paper-item/paper-item.js'

class SearchBar extends LitElement{
    constructor(){
        super();
    }
    
    static get changeWebsite(){
        window.location.replace('http://www.ister.at/Ister1/')
    }

    render(){
        return html`
            <link rel="stylesheet" type="text/css" href=/src/components/searchBar/styles.css>
            <script>
                function changeWebsiteeee(){
                    window.location.replace('http://www.ister.at/Ister1/')
                }
            </script>
            <div class ="background">
                <div class="banner">
                    <p>Ergo Challenge ISTER Linz</p>
                </div>
                <div class="componentSelection">
                    <div class="singleComponent">
                        <p>Distance</p>
                    </div>
                    <div class="singleComponent">
                        <p>Home</p>
                    </div>
                    <div class="singleComponent">
                        <p>30K Ergo Challenge</p>
                    </div>
                    <div class="singleComponent">
                        <p>30K Club Ranking</p>
                    </div>
                    <div class="singleComponent">
                        <p>30K Person Ranking</p>
                    </div>
                    <div class="singleComponent">
                        <p onClick="window.location.replace('http://www.ister.at/Ister1/')">LRV Ister</p>
                    </div>
                    <div class="singleComponent">
                        <p>Login</p>
                    </div>
                </div>
            </div>
            `
    }
}
window.customElements.define('search-bar', SearchBar);