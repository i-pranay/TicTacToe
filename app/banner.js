import { createNode } from "./utils.js";

class Banner extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "closed" });

    //container
    const message = "You Won";
    if (this.getAttribute("userName")) {
      message = `${message} ${this.getAttribute("userName")}`;
    }
    const container = createNode("div", null, null, message);

    shadowRoot.appendChild(container);
  }

  attributeChangedCallback(userName, oldValue, newValue) {}
}

customElements.define("banner", Banner);
