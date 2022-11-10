// import React from 'react'

export function setMyCookie(data) {
    try {
        console.log("name : ", data.name)
        console.log("value : ", data.value)
        console.log("domain : ", data.domain)
        console.log("path : ", data.path)
        console.log("expire : ", data.expire)
        // let cookie = `hgj=${data.ghj}; value=${data.value}`
        let cookie = `name=${data.name};value=${data.value};domain=${window.location.hostname}`
        console.log(cookie)
        // document.cookie = "name=oeschger; SameSite=None; Secure";
        document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

    } catch (error) {
        console.error("Could not set data to cookie session");
        console.error("Details : ", error);
        return null;
    }
};