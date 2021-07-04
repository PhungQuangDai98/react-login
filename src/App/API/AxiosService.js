import axios from "axios";
import queryString from "query-string";

const url = "/oauth/token";

export const login = async (username, password) => {
    const data = {
        username: username,
        password: password,
        grant_type: "password",
        client_id: "koFeApp",
        donvi: "ca49e2ad-644e-462e-aab1-d3d353488041",
    };

    return axios({
        method: "POST",
        data: queryString.stringify(data),
        baseURL: process.env.REACT_APP_SERVICE,
        url: "/oauth/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: "json",
        // crossDomain: true,
        timeout: 300000,
    })
        .then((response) => {
            setAccessToken(response.data);
            // window.location.href = "local.html";
            // console.log(token);
        })
        .catch((err) => {
            console.log(err);
        });
};
const setAccessToken = (token) => {
    sessionStorage.setItem("_accessToken", JSON.stringify(token));
};
export const getAccessToken = () => {
    return JSON.parse(sessionStorage.getItem("_accessToken"));
};
const refreshToken = (refreshToken) => {
    // remove current access token
    setAccessToken(null);

    // refresh the access token
    var data = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: this.clientId,
    };
    return axios({
        method: "POST",
        data: queryString.stringify(data),
        baseURL: process.env.REACT_APP_SERVICE,
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: "Json",
        // crossDomain: true,
        timeout: 300000,
    }).then(function (token) {
        setAccessToken(token);
    });
};
const requestWithAuthentication = (requestType, url, data) => {
    var token = getAccessToken();
    if (token) {
        if (new Date(token[".expires"]) <= new Date() && token.refresh_token) {
            refreshToken(token.refresh_token);
        }
    }
    var ajaxOptions = {
        baseURL: process.env.REACT_APP_API_WITH_AUTHENTICATION,
        url: url,
        method: requestType,
        data: queryString.stringify(data),
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
    };
    console.log(token);
    return axios(ajaxOptions);
};
export const getWithAuthentication = (url, data = null) => {
    return requestWithAuthentication("GET", url, data);
};
export const postWithAuthentication = (url, data) => {
    return requestWithAuthentication("POST", url, data);
};
