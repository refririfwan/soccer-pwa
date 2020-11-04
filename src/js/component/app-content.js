class AppContent extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
            <div class="container" id="body-content"></div>
        `;
    }
}

customElements.define("app-content", AppContent);