
class CookieThings{
    constructor(){
        this.allCookieNames = [];
    }
    setCookie(name, value, expiryDays){
        let dt = new Date();
        dt.setTime(dt.setTime() + (expiryDays*24*60*60*1000));
        let cookieStr = `${name}=${value};expires=${dt.toUTCString()};path=/`;
        document.cookie = cookieStr;
    }
    showCookies(){
        console.log(document.cookie);
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