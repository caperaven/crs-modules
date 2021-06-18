class TestComponent extends HTMLElement {
    connectedCallback() {
        this.textContent = "Test World";
    }
}

customElements.define("test-component", TestComponent);