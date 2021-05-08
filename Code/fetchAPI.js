
let emptyParameter = (className = 'Unknown', param = 'Unknown') => {
    throw `${className} missing parameter ${param}`;
}

class APICall{
    constructor(url = emptyParameter('APICall class', 'url')){
        this.apiUrl = url;
    }
    updateApiUrl = (url = emptyParameter('updateAPICall method', 'url')) => {
        this.apiUrl = url;
    }
    callApi = async() => {
        await fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        });
    }
}

(function(){
    
    document.querySelector("#username").addEventListener("keydown", function(evt){
        if(Number(evt.keyCode) === 13){
            executeApi();
        }    
    });

    //document.querySelector("#Go").onclick = executeApi();

    async function executeApi(){
        let username = document.querySelector("#username").value;
        if(username == "") return false;
        let api = new APICall(`https://api.github.com/users/${username}/repos`);
        let resposatory = await api.callApi();
        console.log(resposatory);
    }

})();