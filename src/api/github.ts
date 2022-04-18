import { Api } from "@src/api/provider-template";

export class GithubApiProvider extends Api{

    constructor() {
        super('/api');
    }

    login(username: string, password: string){
        return this.instance.post('/login', {
            username, password
        });
    }
    fetchOrganizations(username: string){
        return this.instance.get(`/orgs`);
    }

    fetchOrgDetails(username: string, orgSlug: string){
        return this.instance.get(`/org-dtl`);
    }
}