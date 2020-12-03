import API from "./api"

class Standings extends API {
    constructor() {
        super()
        this.ENDPOINT_STANDINGS = `${this.BASE_URL}v2/competitions/${this.LEAGUE}/standings`;
    }

    getAllStandings() {
        if ("caches" in window) {
            caches.match(this.ENDPOINT_STANDINGS).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        const standings = new Standings();
                        standings.showStandings(data);
                    })
                }
            })
        }

        this.fetchAPI(this.ENDPOINT_STANDINGS)
            .then(data => {
                document.querySelector('#standings').style.display = "none";
                document.querySelector('.load1').classList.add('progress');
                document.querySelector('.load2').classList.add('indeterminate');
                setTimeout(function(){
                    document.querySelector('.load1').classList.remove('progress');
                    document.querySelector('.load2').classList.remove('indeterminate');
                    document.querySelector('#standings').style.display = "block";
                    document.querySelector('.loader').style.display = "none";
                },1234)
                this.showStandings(data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    showStandings (data) {
        let standings = "";
        let standingElement = document.getElementById("standings");

        data.standings[0].table.forEach(function (standing) {
            standings += `
                <tr>
                    <td class="center"><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
            `;
        });

        standingElement.innerHTML = `
            <div class="card">

            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th class="center">Badge</th>
                        <th>Team Name</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>P</th>
                    </tr>
                </thead>
                <tbody id="standing">
                    ${standings}
                </tbody>
            </table>
            </div>
        `;
    }
}

export default Standings