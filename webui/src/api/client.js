import axios from 'axios';


const tokenKey = 'authTokens';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" }
});


function setTokens(tokens) {
    localStorage.setItem(tokenKey, JSON.stringify(tokens));
}


function getTokens() {
    try {
        const tokens = localStorage.getItem(tokenKey);
        return tokens ? JSON.parse(tokens) : null;
    } catch { 
        return null;
    }
}

function clearTokens() {
    localStorage.removeItem(tokenKey);
}

export { api, setTokens, getTokens, clearTokens };
