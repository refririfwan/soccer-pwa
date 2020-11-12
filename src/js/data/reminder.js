import MatchesDb from "../database/matchesdb";

class Reminder {
    async saveReminder(data){
        const matchesdb = new MatchesDb();
        await matchesdb.dbInsertMatch(data);
    }

    async removeReminder(matchid){
        const matchesdb = new MatchesDb();
        await matchesdb.dbDeleteMatch(matchid);
    }

    async getAllMatches(){
        const matchesdb = new MatchesDb();
        const matches = await matchesdb.dbShowAllMatches();
        document.querySelector('#reminder').style.display = "none";
        document.querySelector('.load1').classList.add('progress');
        document.querySelector('.load2').classList.add('indeterminate');
        setTimeout(function () {
            document.querySelector('.load1').classList.remove('progress');
            document.querySelector('.load2').classList.remove('indeterminate');
            document.querySelector('#reminder').style.display = "block";
            document.querySelector('.loader').style.display = "none";
        }, 1234);
        this.showMatches(matches);
    }

    showMatches(data){
        let matches = "";
        let matchElement =  document.getElementById("reminder");
        data.forEach(match =>{
            const utcDate = match.utcDate
            const date = utcDate.slice(0,10)
            const time = utcDate.slice(11,16)
            matches += `
                <div class="col s12 m12">
                    <div class="card-panel">
                        <table class="centered">
                            <thead>
                                <tr>
                                    <th>Home Team</th>
                                    <th>Away Team</th>
                                    <th>Venue</th>
                                    <th>Date (UTC)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h6>${match.homeTeam.name}</h6>
                                    </td>
                                    <td>
                                        <h6>${match.awayTeam.name}</h6>
                                    </td>
                                    <td>
                                        <h6>${match.venue}</h6>
                                    </td>
                                    <td>
                                        <h6>${date} at ${time}</h6>
                                    </td>
                                </tr>
                            </tbody>
                            <a class="waves-effect orange btn-small right btnRemove" data-matchid="${match.id}">Remove</a>
                        </table>
                    </div>
                </div>
            `;
        })

        if(matches){
            matchElement.innerHTML = matches;
        } else {
            matchElement.innerHTML = `
                <h2 class="center">Belum ada yang Reminder</h2>
            `;
        }
    }
}

export default Reminder;