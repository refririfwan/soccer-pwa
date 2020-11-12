import API from "./api"

class Upcoming extends API {
    constructor() {
        super()
        this.ENDPOINT_STANDINGS = `${this.BASE_URL}competitions/${this.LEAGUE}/matches`;
    }

    getAllUpcoming() {
        if ("caches" in window) {
            caches.match(this.ENDPOINT_STANDINGS).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("Data Upcoming: " + data);
                        this.showUpcoming(data)
                    })
                }
            })
        }
        this.fetchAPI(this.ENDPOINT_STANDINGS)
            .then(data => {
                document.querySelector('#upcoming').style.display = "none";
                document.querySelector('.load1').classList.add('progress');
                document.querySelector('.load2').classList.add('indeterminate');
                setTimeout(function () {
                    document.querySelector('.load1').classList.remove('progress');
                    document.querySelector('.load2').classList.remove('indeterminate');
                    document.querySelector('#upcoming').style.display = "block";
                    document.querySelector('.loader').style.display = "none";
                }, 1234)
                this.showUpcoming(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    showUpcoming(data) {
        let matches = "";
        let teamElement = document.getElementById("upcoming");
        
        data.matches.forEach(function (match) {
            if (match.status === "SCHEDULED") {
                const utcDate = match.utcDate
                const date = utcDate.slice(0,10)
                const time = utcDate.slice(11,16)
                matches += `
                    <tr>
                        <td class="center">${match.matchday}</td>
                        <td>${match.homeTeam.name}</td>
                        <td>${match.awayTeam.name}</td>
                        <td class="center">${match.status}</td>
                        <td class="center">${date}</td>
                        <td class="center">${time}</td>
                        <td class="center"><a href="./detailMatch.html?matchId=${match.id}" class="waves-effect green btn-small">Detail</a></td>
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
                        <th class="center">Date</th>
                        <th class="center">Time</th>
                        <th class="center">Detail</th>
                    </tr>
                </thead>
                <tbody id="upcoming">
                    ${matches}
                </tbody>
            </table>
            
            </div>
        `;
    }
}

export default Upcoming