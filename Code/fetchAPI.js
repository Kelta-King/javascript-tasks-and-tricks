
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
        try {
            
        await fetch(this.apiUrl)
        .then(response => response.json())
        .then(repositories => {
            const area = document.querySelector('#'+id);
            while (area.firstChild) {
                area.removeChild(area.lastChild);
            }
            repositories.forEach(repo => {
                const div = document.createElement('DIV');
                const url = repo['html_url'];
                const repoName = repo['name'];
                const desc = repo['description'];

                div.setAttribute('class', 'w3-padding w3-border w3-round w3-margin kel-hover w3-hover-light-gray');
                div.onclick = function (){ window.open(url) };
                const divName = document.createElement('DIV');
                divName.setAttribute('class', 'w3-large');
                divName.setAttribute('style', 'text-align:left');
                divName.innerHTML = repoName + ' &#8594;';
                div.appendChild(divName);

                const hr = document.createElement('HR');
                div.appendChild(hr);
                const divDesc = document.createElement('DIV');
                divDesc.setAttribute('style', 'text-align:left');
                (desc == null) ? divDesc.innerText = 'No description is provided' : divDesc.innerText = `${desc.substr(0, 50)}...`;
                div.appendChild(divDesc);
                area.appendChild(div);
            });
        });
        } catch (error) {
            console.log("Something went wrong. Check username...");
        }
    }
}

(function(){
    try {
        document.querySelector('#repositories').setAttribute('style', 'height:600px;overflow-y:scroll');
        document.querySelector("#username").addEventListener("keydown", function(evt){
            if(Number(evt.keyCode) === 13) executeApi();
        });
        document.querySelector("#Go").onclick = function(){ executeApi(); }
    
        async function executeApi(){
        const username = document.querySelector("#username").value;
        if(username == "") return false;
        const api = new APICall(`https://api.github.com/users/${username}/repos`);
        api.callApi('repositories');
        }
    } catch (error) {
        console.log(error);
    }

})();