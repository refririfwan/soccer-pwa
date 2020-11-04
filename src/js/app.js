import "./component/app-bar"
import "./component/app-content"
import "./component/app-footer"
import "./component/nav-team"
import "./component/team-content"
import Standings from "./data/standings"
import Teams from "./data/teams"
import Matches from "./data/matches"
import Upcoming from "./data/upcoming"
import Team from "./data/team"

const app = function () {
    const standings = new Standings()
    const teams = new Teams()
    const match = new Matches()
    const upcoming = new Upcoming()
    const team = new Team()
    const elems = document.querySelectorAll(".sidenav-appbar");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav-appbar, .sidenav-appbar").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav-appbar a, .topnav-appbar a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav-appbar");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "pages/navbar.html", true);
        xhttp.send();
    }

    // Load pages content
    var page = window.location.hash.substr(1);
    if (page === "") page = "standings";
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    var urlParams = new URLSearchParams(window.location.search);
                    var teamId = urlParams.get("teamId")
                    if (!teamId && !urlParams.get("matchId")){
                        content.innerHTML = xhttp.responseText;
                        if(page === "standings") {
                            standings.getAllStandings()
                        } else if(page === "teams") {
                            teams.getAllTeams()
                        } else if (page === "matches"){
                            match.getAllMatches() 
                        } else if (page === "upcoming") {
                            upcoming.getAllUpcoming()
                        } else if (page === "favorite") {
                            
                        } else if (page === "reminder") {
                            
                        } else {
                            content.innerHTML = `<h3 class="center red-text" style="margin-top: 9%; margin-bottom: 90%";> Ups... halaman tidak ada.</h3>`;
                        }
                    } else if (teamId) {
                        document.querySelector('.load1').classList.add('progress');
                        document.querySelector('.load2').classList.add('indeterminate');
                        team.getTeamDetail(teamId);
                    }
                } else if (this.status === 404) {
                    content.innerHTML = `<h3 class="center red-text" style="margin-top: 9%; margin-bottom: 90%";> Halaman tidak ditemukan. </h3>`;
                } else {
                    content.innerHTML = `<h3 class="center red-text" style="margin-top: 9%; margin-bottom: 90%";> Ups... halaman tidak dapat diakses. </h3>`;
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
}

export default app;