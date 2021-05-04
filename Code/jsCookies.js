
class CookieThings{
    constructor(){
        this.allCookieNames = [];
    }
    setCookie = (name, value, expiryDays) => {
        let dt = new Date();
        dt.setTime(dt.setTime() + (expiryDays*24*60*60*1000));
        let cookieStr = `${name}=${value};expires=${dt.toUTCString()};path=/`;
        document.cookie = cookieStr;
    }
    deleteCookie = (name) => {
        let cookieStr = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = cookieStr;
        return true;
    }
    showCookies = () => {
        let cookies = document.cookie;
        cookies = cookies.split(";");
        cookies.forEach(cookie => {
            cookie = cookie.split("=");
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
            btn.onclick = function(event){
                return this.deleteCookie(cookie[0]);
            }
            div.appendChild(b);
            div.appendChild(value);
            div.appendChild(br1);
            div.appendChild(br2);
            div.appendChild(btn);
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