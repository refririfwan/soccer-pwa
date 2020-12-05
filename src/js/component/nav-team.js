class NavTeam extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
            <nav role="navigation" class="red accent-4">
                <div class="nav-wrapper container">
                    <a class="right brand-logo" id="logo-container">Detail Team</a>
                    <a href="./#teams" class="sidenav-trigger responsive-img" style="margin-top: 2%;" data-target="nav-mobile"><img src="img/arrow-119-32.ico" alt="arrow-back"></a>
                    <ul class="topnav left hide-on-med-and-down">
                        <li><a href="./#teams"><img src="img/arrow-119-32.ico" style="margin-top: 40%;" class ="responsive-img" alt="arrow-back"></a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}

customElements.define("nav-team", NavTeam);