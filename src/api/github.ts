import {Api} from "@src/api/provider-template";

export class GithubApiProvider extends Api{

    constructor() {
        super('/api/github');
    }

    fetchOrganizations(){
        return this.instance.get(`/org`);
    }

    fetchOrgDetails(slug: string){
        return this.instance.get(`/org/detail/${slug}`);
    }

    fetchOrgRepositories(org: string){
        return this.instance.get(`/repo/${org}`)
    }
}