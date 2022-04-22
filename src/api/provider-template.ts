import axios, {AxiosInstance, AxiosResponse} from "axios";

export abstract class Api {
    public instance: AxiosInstance;
    public name: Provider;
    protected constructor(baseUrl: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        });
        this.name = Provider.github;
    }

    fetchOrganizations(){
        return new Promise(()=> ({} as AxiosResponse));
    }

    fetchOrgDetails(slug: any){
        return new Promise(()=> ({} as AxiosResponse));
    }

    fetchOrgRepositories(org: any){
        return new Promise(()=> ({} as AxiosResponse));
    }
}

export enum Provider {
    github = 'github',
    gitlab = 'gitlab'
}