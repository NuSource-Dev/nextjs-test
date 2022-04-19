import { Api } from "@src/api/provider-template";

export class GitLabApiProvider extends Api{

    constructor() {
        super('/');
    }

    fetchUser(){
        return this.instance.post('/user');
    }

    fetchOrganizations(username: string){
        return this.instance.get(`/orgs/${username}`);
    }

    fetchOrgDetails(username: string, orgSlug: string){
        return this.instance.get(`/org-dtl/${username}/${orgSlug}`);
    }
}