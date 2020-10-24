import "./component/app-bar"
import "./component/app-content"
import "./component/app-footer"
import Standings from "./data/standings"
import Teams from "./data/teams"
import Matches from "./data/matches"

const app = function () {
    const standings = new Standings()
    const teams = new Teams()
    const match = new Matches()
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
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
                    content.innerHTML = xhttp.responseText;
                    if(page === "standings") {
                        standings.getAllStandings()
                    } else if(page === "teams") {
                        teams.getAllTeams()
                    } else if (page === "matches"){
                        match.getAllMatches()
                    } else {
                        content.innerHTML = "<p>Ups.. halaman tidak ada.</p>";
                    }
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
}

export default app;