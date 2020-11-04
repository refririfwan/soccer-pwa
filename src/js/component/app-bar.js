class AppBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
            <nav role="navigation" class="green darken-3">
                <div class="nav-wrapper container">
                    <a href="#" class="right brand-logo" id="logo-container">Bundesliga</a>
                    <a href="#" class="sidenav-trigger" data-target="nav-mobile">&#9776;</a>
                    <ul class="topnav left hide-on-med-and-down topnav-appbar"></ul>
                    <ul class="sidenav sidenav-appbar" id="nav-mobile"></ul>
                </div>
            </nav>
        `;
    }
}

customElements.define("app-bar", AppBar);