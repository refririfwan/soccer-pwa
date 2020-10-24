class AppFooter extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="footer-copyright green darken-3" style="padding:1.5%;" id="footer-app">
                <div class="container center">
                    <span class="white-text">Refri Rifwan © Copyright 2020</span>
                </div>
            </div>
        `;
    }
}

customElements.define("app-footer", AppFooter);