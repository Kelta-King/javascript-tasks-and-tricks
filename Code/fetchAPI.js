
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
    callApi = async(id) => {
        await fetch(this.apiUrl)
        .then(response => response.json())
        .then(repositories => {
            repositories.forEach(repo => {
                const div = document.createElement('DIV');
                div.setAttribute('class', 'w3-padding w3-border w3-round w3-margin');
                const divName = document.createElement('DIV');
                divName.setAttribute('class', 'w3-large');
                divName.innerText = repo['name'];
                div.appendChild(divName);
                document.querySelector('#'+id).appendChild(div);
            });
        });
    }
}

(function(){
    
    document.querySelector('#repositories').setAttribute('style', 'height:600px;overflow-y:scroll');
    document.querySelector("#username").addEventListener("keydown", function(evt){
        if(Number(evt.keyCode) === 13) executeApi();
    });
    async function executeApi(){
        const username = document.querySelector("#username").value;
        if(username == "") return false;
        const api = new APICall(`https://api.github.com/users/${username}/repos`);
        api.callApi('repositories');
    }

})();