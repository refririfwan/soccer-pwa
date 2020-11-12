import idb from "idb";

class MatchesDb {
    dbPromise(){
        return idb.open("soccer-matches", 1, function (upgradeDb) {
            if (!upgradeDb.objectStoreNames.contains("matches")) {
                const matches = upgradeDb.createObjectStore("matches", { keyPath: "id" });
                matches.createIndex("id", "id", { unique: true });
            }
        })
    }

    dbInsertMatch(data) {
        this.dbPromise().then(function (db) {
            const tx = db.transaction('matches', 'readwrite');
            const store = tx.objectStore('matches');
            const match = data;
            store.add(match);
            return tx.complete;
        }).then(function () {
            alert("Match reminder berhasil disimpan");
            location.replace("./#reminder")
        }).catch(function () {
            console.log("Match reminder gagal disimpan.");
            alert("Match reminder gagal disimpan.");
            location.replace("./detailMatch.html?matchId=" + data.id)
        })
    }

    dbShowAllMatches() {
        return this.dbPromise().then(function (db) {
            const tx = db.transaction('matches', 'readonly');
            const store = tx.objectStore('matches');
            return store.getAll();
        }).then(matches => matches);
    }

    dbDeleteMatch(matchid) {
        this.dbPromise().then(function (db) {
            const tx = db.transaction('matches', 'readwrite');
            const store = tx.objectStore('matches');
            const id = Number(matchid);
            store.delete(id);
            return tx.complete;
        }).then(function () {
            alert('Match Removed');
            location.reload(); 
        });
    }
}

export default MatchesDb;