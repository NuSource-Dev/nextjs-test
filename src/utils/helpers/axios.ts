import axios, {AxiosInstance} from "axios";

const createAxiosInstance = (baseUrl: string, access_token: string = ''): AxiosInstance => axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Accept": "application/json",
        "Authorization": `Bearer ${access_token}`
    }
});

export default createAxiosInstance;