import { Api } from "@src/api/provider-template";

export class GithubApiProvider extends Api{

    constructor() {
        super('/api');
    }

    fetchUser(){
        return this.instance.post('/user');
    }
    fetchOrganizations(username: string){
        return this.instance.get(`/orgs`);
    }

    fetchOrgDetails(username: string, orgSlug: string){
        return this.instance.get(`/org-dtl`);
    }
}