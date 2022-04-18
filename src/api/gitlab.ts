import { Api } from "@src/api/provider-template";

export class GitLabApiProvider extends Api{

    constructor() {
        super('/');
    }

    login(username: string, password: string){
        return this.instance.post('/login', {
            username, password
        });
    }

    fetchOrganizations(username: string){
        return this.instance.get(`/orgs/${username}`);
    }

    fetchOrgDetails(username: string, orgSlug: string){
        return this.instance.get(`/org-dtl/${username}/${orgSlug}`);
    }
}