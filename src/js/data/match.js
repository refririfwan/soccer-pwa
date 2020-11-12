class Match {
    getMatch(matchId){
        return fetch(`https://api.football-data.org/v2/matches/${matchId}`,{
            headers: {
                'X-Auth-Token': '16d85bf702974259b17e4dff4faeade4'
            }
        })
        .then(response => response.json())
        .then(match => match)
    }

    async getMatchDetail(matchId){
        const match = await this.getMatch(matchId);
        this.showMatch(match);
    }

    showMatch(data){
        const utcDate = data.match.utcDate;
        const date = utcDate.slice(0,10);
        const time = utcDate.slice(11,16);
        let teamElement = document.getElementById('match-body-content');
        teamElement.innerHTML = `
            <div class="row">
                <div class="col s12 m12">
                    <h3 class="header center">${data.match.homeTeam.name} VS ${data.match.awayTeam.name}</h3>
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <ul class="collection">
                                    <li class="collection-item">
                                        <h4 class="center"> Venue  :  ${data.match.venue}</h4> 
                                    </li>
                                    <li class="collection-item">
                                        <h5 class="center"> Date & Time  :  ${date} at ${time} UTC</h5> 
                                    </li>
                                    <li class="collection-item">
                                        <h6 class="center"> Matchday  :  ${data.match.matchday}</h6> 
                                    </li>
                                    <li class="collection-item">
                                        <h6 class="center"> Status  :  ${data.match.status}</h6> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                <h4 class="header center">Home Team : ${data.head2head.homeTeam.name}</h4>
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <ul class="collection">
                                    <li class="collection-item">
                                        <h5 class="center green-text"> Wins  :  ${data.head2head.homeTeam.wins}</h5> 
                                    </li>
                                    <li class="collection-item">
                                        <h6 class="center orange-text"> Draws  :  ${data.head2head.homeTeam.draws}</h6> 
                                    </li>
                                    <li class="collection-item">
                                        <p class="center red-text"> Losses  :  ${data.head2head.homeTeam.losses}</p> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                <h4 class="header center">Away Team : ${data.head2head.awayTeam.name}</h4>
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <ul class="collection">
                                    <li class="collection-item">
                                        <h5 class="center green-text"> Wins  :  ${data.head2head.awayTeam.wins}</h5> 
                                    </li>
                                    <li class="collection-item">
                                        <h6 class="center orange-text"> Draws  :  ${data.head2head.awayTeam.draws}</h6> 
                                    </li>
                                    <li class="collection-item">
                                        <p class="center red-text"> Losses  :  ${data.head2head.awayTeam.losses}</p> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 m12">
                <a class="waves-effect green btn-small right btnReminder">Reminder</a>
                </div>
            </div>
        `;
    }

}

export default Match;