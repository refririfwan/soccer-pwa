class Team {
    getTeam(teamId){
        return fetch(`https://api.football-data.org/v2/teams/${teamId}`, {
            headers: {
                'X-Auth-Token': '16d85bf702974259b17e4dff4faeade4'
            }
        })
        .then(response => response.json())
        .then(team => team)
    }

    async getTeamDetail(teamId){
        const team = await this.getTeam(teamId)
        this.showTeam(team)
    }

    showTeam(team){
        let teamElement = document.getElementById('team-body-content');
        teamElement.innerHTML = `
            <div class="col s12 m6" style="margin-bottom:9%;">
                <h2 class="header">${team.name}</h2>
                <div class="card horizontal">
                    <div class="card-image">
                        <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.shortName}">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <ul class="collection">
                                <li class="collection-item">Colors  : ${team.clubColors}</li>
                                <li class="collection-item">Address : ${team.address}</li>
                                <li class="collection-item">Email   : ${team.email}</li>
                                <li class="collection-item">Phone   : ${team.phone}</li>
                            </ul>
                        </div>
                        <div class="card-action">
                            <a class="waves-effect green btn-small right btnSave">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default Team;