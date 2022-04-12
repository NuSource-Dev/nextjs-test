import axios from "axios";

export default axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
    },
    data: {
        username: 'john'
    }
});