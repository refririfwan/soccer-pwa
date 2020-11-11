import TeamsDb from "../database/teamsdb"

class Favorite {
    
    async saveFavorite(data){
        const teamsdb = new TeamsDb();
        await teamsdb.dbInsertTeam(data);
    }

    async removeFavorite(teamid){
        const teamsdb = new TeamsDb();
        await teamsdb.dbDeleteTeam(teamid)
    }

    async getAllTeams(){
        const teamsdb = new TeamsDb();
        const teams = await teamsdb.dbShowAllTeams();
        document.querySelector('#favorite').style.display = "none";
        document.querySelector('.load1').classList.add('progress');
        document.querySelector('.load2').classList.add('indeterminate');
        setTimeout(function () {
            document.querySelector('.load1').classList.remove('progress');
            document.querySelector('.load2').classList.remove('indeterminate');
            document.querySelector('#favorite').style.display = "block";
            document.querySelector('.loader').style.display = "none";
        }, 1234)
        this.showTeams(teams)
    }

    showTeams(data){
        let teams = "";
        let teamElement =  document.getElementById("favorite");
        data.forEach(function(team){
            teams += `    
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.shortName}">
                    </div>
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item">Name    : ${team.name}</li>
                            <li class="collection-item">Since   : ${team.founded}</li>
                            <li class="collection-item">Venue   : ${team.venue}</li>
                            <li class="collection-item">Colors  : ${team.clubColors}</li>
                            <li class="collection-item">Address : ${team.address}</li>
                            <li class="collection-item">Email   : ${team.email}</li>
                            <li class="collection-item">Phone   : ${team.phone}</li>
                            <li class="collection-item">Website : <a href="${team.website}"  target="_blank">${team.shortName}</a></li>
                        </ul>
                        <a class="waves-effect orange btn-small right btnDelete" data-teamid="${team.id}">Remove</a>
                    </div>
                    <div class="card-action">
                    </div>
                </div>
            </div>`;
        });
        if(teams){
            teamElement.innerHTML = teams;
        } else {
            teamElement.innerHTML = `
                <div class="row" style="margin-top: 9%; margin-bottom: 90%;">
                    <h2 class="center">Belum ada yang Favorite</h2>
                </div>
            `;
        }
    }
}

export default Favorite;