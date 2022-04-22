import {Api, Provider} from "@src/api/provider-template";
import {AxiosResponse} from "axios";

export class GitLabApiProvider extends Api{

    constructor() {
        super('/api/gitlab');
        this.name = Provider.gitlab;
    }

    fetchOrganizations(){
        return this.instance.get(`/orgs`);
    }

    fetchOrgDetails(slug?: string | string[]){
        return this.instance.get(`/org-dtl`);
    }

    fetchOrgRepositories(org: string){
        return new Promise(()=> ({} as AxiosResponse));
    }
}