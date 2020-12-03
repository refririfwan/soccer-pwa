class API {
    constructor() {
        this.API_KEY = "16d85bf702974259b17e4dff4faeade4";
        this.BASE_URL = "https://api.football-data.org/";
        this.LEAGUE = "BL1";
        this.fetchAPI = url => {
            return fetch(url, {
                headers: {
                    'X-Auth-Token': this.API_KEY
                }
            })
                .then(res => {
                    if (res.status !== 200) {
                        console.log("Error: " + res.status);
                        return Promise.reject(new Error(res.statusText))
                    } else {
                        return Promise.resolve(res)
                    }
                })
                .then(res => res.json())
                .catch(err => {
                    console.log(err)
                })
        };
    }

}

export default API