class TeamContent extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
            <div class="container" id="team-body-content">
                <div class="row loader" style="margin-top: 9%; margin-bottom: 90%;">
                    <div class="col s12 m12">
                        <div class="load1">
                            <div class="load2"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("team-content", TeamContent);