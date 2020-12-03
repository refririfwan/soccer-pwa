import API from "./api"

class Matches extends API {
    constructor() {
        super()
        this.ENDPOINT_STANDINGS = `${this.BASE_URL}v2/competitions/${this.LEAGUE}/matches`;
    }

    getAllMatches() {
        if ("caches" in window) {
            caches.match(this.ENDPOINT_STANDINGS).then((response) => {
                if (response) {
                    response.json().then(function (data) {
                        const matches = new Matches();
                        matches.showMatches(data);
                    })
                }
            })
        }
        this.fetchAPI(this.ENDPOINT_STANDINGS)
            .then(data => {
                document.querySelector('#matches').style.display = "none";
                document.querySelector('.load1').classList.add('progress');
                document.querySelector('.load2').classList.add('indeterminate');
                setTimeout(function () {
                    document.querySelector('.load1').classList.remove('progress');
                    document.querySelector('.load2').classList.remove('indeterminate');
                    document.querySelector('#matches').style.display = "block";
                    document.querySelector('.loader').style.display = "none";
                }, 1234);
                this.showMatches(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    showMatches(data) {
        let matches = "";
        let teamElement = document.getElementById("matches");

        data.matches.forEach(function (match) {
            if (match.status === "FINISHED") {
                matches += `
                    <tr>
                        <td class="center">${match.matchday}</td>
                        <td>${match.homeTeam.name}</td>
                        <td>${match.awayTeam.name}</td>
                        <td class="center">${match.status}</td>
                        <td class="center"> ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam} </td>
                    </tr>
                `;
            }
        });

        teamElement.innerHTML = `
            <div class="card">

            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th class="center">Matchday</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th class="center">Status</th>
                        <th class="center">Score</th>
                    </tr>
                </thead>
                <tbody id="match">
                    ${matches}
                </tbody>
            </table>
            
            </div>
        `;
    }
}

export default Matches