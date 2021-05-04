
class CookieThings{
    setCookie = (name, value, expiryDays) => {
        // Checking proper details
        if(name == '' || value == '' || expiryDays == ''){ 
            alert("Please provide necessary details");
            return false;
        }
        // Date attribute for cookie destroy
        let dt = new Date();
        dt.setTime(dt.setTime() + (expiryDays*24*60*60*1000));
        let cookieStr = `${name}=${value};expires=${dt.toUTCString()};path=/`;

        // Setting cookie
        document.cookie = cookieStr;
        location.reload();
    }
    deleteCookie = (name) => {
        let cookieStr = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = cookieStr;
        return true;
    }
    showCookies = () => {
        // Getting cookie values
        let cookies = document.cookie;
        if(Number(cookies.length) == 0){
            let txt = document.createTextNode("No cookies are there");
            let div = document.createElement("DIV");
            div.setAttribute("class", "w3-center w3-padding w3-margin w3-white w3-round");
            div.appendChild(txt);
            document.querySelector("#cookies").appendChild(div);
            return false;
        }

        // Array convert
        cookies = cookies.split(";");

        // Making sections for each array element
        cookies.forEach(cookie => {

            // name value split
            cookie = cookie.split("=");

            // Making blocks for section
            let div = document.createElement("DIV");
            let b = document.createElement("B");
            let br1 = document.createElement("BR");
            let br2 = document.createElement("BR");
            div.setAttribute("class", "w3-padding w3-border w3-margin w3-white")
            b.innerText = `${cookie[0]}: `;
            let value = document.createTextNode(cookie[1]);
            let btn = document.createElement("BUTTON");
            btn.innerText = 'Delete';
            btn.setAttribute("class", "w3-red w3-round w3-button kel-hover");

            // Deleting cookie function
            btn.onclick = () => {
                this.deleteCookie(cookie[0]);
                location.reload();
            }

            // Appending blocks of section
            div.appendChild(b);
            div.appendChild(value);
            div.appendChild(br1);
            div.appendChild(br2);
            div.appendChild(btn);

            // Section append
            document.querySelector("#cookies").appendChild(div);
        });
    }
}

(function(){
    let set = document.querySelector("#set");
    let ct = new CookieThings();
    set.onsubmit = function(event){
        event.preventDefault();
        cname = set.cookie.value;
        cdata = set.data.value;
        ct.setCookie(cname, cdata, Number(2));
    }
    ct.showCookies();
})();