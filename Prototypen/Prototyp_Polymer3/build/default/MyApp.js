import { LitElement, html } from "./node_modules/@polymer/lit-element/lit-element.js";

class MyApp extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`this is my first component`;
  }

}

customElements.define('my-app', MyApp);