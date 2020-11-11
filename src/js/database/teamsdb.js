import idb from "idb";

class TeamsDb {
    dbPromise() {
        return idb.open("soccer-database", 1, function (upgradeDb) {
            if (!upgradeDb.objectStoreNames.contains("teams")) {
                const teams = upgradeDb.createObjectStore("teams", { keyPath: "id" });
                teams.createIndex("id", "id", { unique: true });
            }
        })
    }

    dbInsertTeam(data) {
        this.dbPromise().then(function (db) {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            const team = data;
            store.add(team)
            return tx.complete;
        }).then(function () {
            alert("Team favorite berhasil disimpan");
            location.replace("./#favorite")
        }).catch(function () {
            alert("Team favorite gagal disimpan.");
            location.replace("./detailTeam.html?teamId=" + data.id)
        })
    }

    dbShowAllTeams() {
        return this.dbPromise().then(function (db) {
            const tx = db.transaction('teams', 'readonly');
            const store = tx.objectStore('teams');
            return store.getAll();
        }).then(teams => teams);
    }

    dbDeleteTeam(teamid) {
        this.dbPromise().then(function (db) {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            const id = Number(teamid);
            store.delete(id);
            return tx.complete;
        }).then(function () {
            alert('Team Removed');
            location.reload(); 
        });
    }
}

export default TeamsDb;