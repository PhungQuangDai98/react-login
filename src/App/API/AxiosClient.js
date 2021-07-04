import axios from "axios";
// import queryString from "query-string"; //npm install query-string

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 300000
    // paramsSerializer: (param) => queryString.stringify(param),
});

axiosClient.interceptors.request.use(async (config) => {
    /* const token = "";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } */
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);
export default axiosClient;
