import axios, {AxiosInstance} from "axios";

export class BackendService {
    public instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            baseURL: '/api/backend',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    }

    getUser(vcs: string) {
        return this.instance.get(`/${vcs}/user`);
    }

    getOrgs(vcs: string){
        return this.instance.get(`/${vcs}/orgs`);
    }

    getOrgDetail(vcs: string, slug: string){
        return this.instance.get(`/${vcs}/orgs/${slug}`);
    }

    getOrgRepos(vcs: string, slug: string){
        return this.instance.get(`/${vcs}/orgs/${slug}/repos`);
    }
}

export default new BackendService();