import API from "./api"

class Standings extends API {
    constructor() {
        super()
        this.ENDPOINT_STANDINGS = `${this.BASE_URL}competitions/${this.LEAGUE}/standings`;
    }

    getAllStandings() {
        if ("caches" in window) {
            caches.match(this.ENDPOINT_STANDINGS).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("Data Standings: " + data);
                        this.showStanding(data)
                    })
                }
            })
        }

        this.fetchAPI(this.ENDPOINT_STANDINGS)
            .then(data => {
                this.showStanding(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    showStanding (data) {
        let standings = "";
        let standingElement = document.getElementById("standings");

        data.standings[0].table.forEach(function (standing) {
            standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
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
                    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
    
                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Nama Tim</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>P</th>
                            </tr>
                        </thead>
                        <tbody id="standings">
                            ${standings}
                        </tbody>
                    </table>
                    </div>
        `;
    }
}

export default Standings