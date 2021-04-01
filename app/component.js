class MyComponent extends HTMLElement {
    connectedCallback() {
        this.textContent = "Hello World";
    }
}

customElements.define("my-component", MyComponent);