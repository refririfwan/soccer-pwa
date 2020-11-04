import API from "./api"

class Teams extends API {
    constructor() {
        super()
        this.ENDPOINT_STANDINGS = `${this.BASE_URL}competitions/${this.LEAGUE}/teams`;
    }

    getAllTeams() {
        if ("caches" in window) {
            caches.match(this.ENDPOINT_STANDINGS).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        // console.log("Data Teams: " + data);
                        this.showTeams(data)
                    })
                }
            })
        }
        this.fetchAPI(this.ENDPOINT_STANDINGS)
            .then(data => {
                document.querySelector('#teams').style.display = "none";
                document.querySelector('.load1').classList.add('progress');
                document.querySelector('.load2').classList.add('indeterminate');
                setTimeout(function () {
                    document.querySelector('.load1').classList.remove('progress');
                    document.querySelector('.load2').classList.remove('indeterminate');
                    document.querySelector('#teams').style.display = "block";
                    document.querySelector('.loader').style.display = "none";
                }, 1234)
                this.showTeams(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    showTeams(data) {
        let teams = "";
        let teamElement =  document.getElementById("teams");
    
        data.teams.forEach(function (team) {
            teams += `
                <tr>
                    <td class="center"><a href="./detailTeam.html?teamId=${team.id}" class="waves-effect green btn-small">Detail</a></td>
                    <td class="center"><img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${team.name}</td>
                    <td>${team.venue}</td>
                    <td class="center">${team.founded}</td>
                    <td class="center"><a href="${team.website}"  target="_blank">${team.shortName}</a></td>
                </tr>
            `;
        });
    
        teamElement.innerHTML = `
            <div class="card">

            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th class="center">Detail</th>
                        <th class="center">Badges</th>
                        <th>Team Name</th>
                        <th>Venue</th>
                        <th class="center">Founded</th>
                        <th class="center">Website</th>
                    </tr>
                </thead>
                <tbody id="team">
                    ${teams}
                </tbody>
            </table>
            
            </div>
        `;
    }

}

export default Teams