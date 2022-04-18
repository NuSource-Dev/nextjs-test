import axios, {AxiosInstance, AxiosResponse} from "axios";
import {string} from "prop-types";

export abstract class Api {
    public instance: AxiosInstance;
    protected constructor(baseUrl: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        })
    }

    login(username: string, password: string){
        return new Promise(()=> ({} as AxiosResponse));
    }

    fetchOrganizations(username: string){
        return new Promise(()=> ({} as AxiosResponse));
    }

    fetchOrgDetails(username: string, orgSlug: string){
        return new Promise(()=> ({} as AxiosResponse));
    }
}

export enum Provider {
    github,
    gitlab
}