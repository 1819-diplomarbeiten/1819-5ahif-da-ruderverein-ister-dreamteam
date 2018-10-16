import { LitElement, html } from "../../../node_modules/@polymer/lit-element/lit-element.js"; //import {HTMLImports} from '@webcomponents/html-imports'

import "./add-item.js";

class TodoApp extends LitElement {
  static get properties() {
    return {
      todoList: Array
    };
  }

  constructor() {
    super();
    this.todoList = [];
  }

  render() {
    return html`
        <p>Hello todo App 12</p>
        <add-item></add-item>
        `;
  }

}
/*window.addEventListener('WebComponentsReady', function() {
    HTMLImports.whenReady(function() {
      window.customElements.define('todo-app', TodoApp);
    })
 })*/


window.customElements.define('todo-app', TodoApp);