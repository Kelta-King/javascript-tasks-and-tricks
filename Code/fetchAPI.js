
// Function to throw exception when parameter is missing
let emptyParameter = (className = 'Unknown', param = 'Unknown') => {
    throw `${className} missing parameter ${param}`;
}

// APICall class
class APICall{
    constructor(url = emptyParameter('APICall class', 'url')){
        this.apiUrl = url;
    }
    updateApiUrl = (url = emptyParameter('updateAPICall method', 'url')) => {
        this.apiUrl = url;
    }

    // Asynchronous callApi function.
    callApi = async(id = emptyParameter('callApi method', 'id')) => {
        try {
            
        await fetch(this.apiUrl)
        .then(response => response.json()) // Json conversion
        .then(repositories => {

            // You can change the below display code tho display output in front end
            const area = document.querySelector('#'+id);
            while (area.firstChild) {
                area.removeChild(area.lastChild);
            }
            repositories.forEach(repo => {
                const div = document.createElement('DIV');

                // Getting data from response
                const url = repo['html_url'];
                const repoName = repo['name'];
                const desc = repo['description'];

                // Setting repo element structure
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
            // Incase of an error occure, mostly incorrect username then this will trigger
            console.log(error);
            console.log("Something went wrong. Check username...");
        }
    }
}

(function(){
    try {
        // Setting style for repos
        document.querySelector('#repositories').setAttribute('style', 'height:600px;overflow-y:scroll');
        
        // Executing api
        document.querySelector("#username").addEventListener("keydown", function(evt){
            if(Number(evt.keyCode) === 13) executeApi();
        });
        document.querySelector("#Go").onclick = function(){ executeApi(); }
    
        // Asynchronous function to call asynchronous function of class APICall
        async function executeApi(){

            // Username values
            const username = document.querySelector("#username").value;
            if(username == "") return false;
            
            // Making api object and calling api
            const api = new APICall(`https://api.github.com/users/${username}/repos`);
            api.callApi('repositories');
        }
    } catch (error) {
        console.log(error);
    }

})();