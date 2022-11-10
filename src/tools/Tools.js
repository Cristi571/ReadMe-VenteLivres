
import React from 'react'

export function saveToLocal(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log("Data saved successfully to local storage")
    } catch (error) {
        console.error("Could not save data to local storage")
        console.error("Details : ", error)
    }
};

// Get one data object from localStorage by its key
export function getFromLocal(key) {
    try {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not get data from local storage");
        console.error("Details : ", error);
        return null;
    }
};


// Delete one record from localStorage by its key
export function removeFromLocal(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Could not remove data from local storage");
        console.error("Details : ", error);
    }
};


// Delete all the records at once
export function clearLocalStorage() {
    try {
        if (window.confirm("Clear the entire game history?")) {
            window.localStorage.clear();
        }
    } catch (error) {
        console.error("Could not remove data from local storage");
        console.error("Details : ", error);
    }
};


// Extract all the records keys for the localStorage
export function getKeysFromLocal() {
    // Check the browser support for local storage
    if (typeof(Storage) !== "undefined") { 
        let index = 0;
        let localKeys = [];
        while (window.localStorage.key(index)) {
            let key = window.localStorage.key(index);
            console.log("test : ", key.substring(0,3))
            if (key.substring(0,3) === "id_") {
                localKeys.push(key);
            }
            index++;
        }
        // console.log("No more records.")
        return localKeys;
        } else {
        // No web storage Support.
        console.warn("Your browser does not support localStorage, so we can not save your game data.")
    }
};