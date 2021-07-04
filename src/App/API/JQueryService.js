import $ from "jquery";

const apiService = process.env.REACT_APP_SERVICE + "/oauth/token";
const apiWithAuthentication = process.env.REACT_APP_API_WITH_AUTHENTICATION;

export const login = async (username, password) => {
    const data = {
        username: username,
        password: password,
        grant_type: "password",
        client_id: "koFeApp",
        donvi: "ca49e2ad-644e-462e-aab1-d3d353488041"
    };

    return $.ajax({
        type: "POST",
        async: true,
        data: data,
        url: apiService,
        contentType: "application/x-www-form-urlencoded",
        dataType: "Json",
        crossDomain: true,
        timeout: 300000
    }).then((token) => {
        setAccessToken(token);
        // window.location.href = "local.html";
        console.log(token);
    })
}
const setAccessToken = (token) => {
    sessionStorage.setItem("_accessToken", JSON.stringify(token));
}
const getAccessToken = () => {
    return JSON.parse(sessionStorage.getItem("_accessToken"));
}
const refreshToken = (refreshToken) => {
    // remove current access token
    setAccessToken(null);

    // refresh the access token
    var data = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: this.clientId,
    };
    return $.ajax({
        type: "POST",
        async: false,
        data: data,
        url: apiService,
        contentType: "application/x-www-form-urlencoded",
        dataType: "Json",
        crossDomain: true,
        timeout: 300000,
    }).then(function(token) {
        setAccessToken(token);
    });
}
const requestWithAuthentication = (requestType, url, data) => {
    var token = getAccessToken();
    if (token) {
        if (new Date(token[".expires"]) <= new Date() && token.refresh_token) {
            refreshToken(token.refresh_token);
        }
    }
    var ajaxOptions = {
        url: apiWithAuthentication + url,
        type: requestType,
        async: true,
        data: data,
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
    };
    return $.ajax(ajaxOptions);
}
export const getWithAuthentication = (url, data) => {
    return requestWithAuthentication("GET", url, data);
}
export const postWithAuthentication = (url, data) => {
    return requestWithAuthentication("POST", url, data);
}