import {Provider} from "@src/api/provider-template";

export class Organization {
    /** Organization avatar url
     * @github avatar_url
     */
    avatar_url: string;
    /** Organization description
     * @github description
     */
    description: string;
    /** Organization display name
     * @github login (it should be display name but api doesn't return display name)
     */
    display_name: string;
    /** Organization slug
     * @github login
     */
    slug: string;

    /** Api provider
     * @github Provider.github
     * @gitlab Provider.gitlab
     */
    provider: Provider;

    /** constructor
     * @param org
     * @param provider
     */
    constructor(org: any, provider: Provider){
        this.provider = provider;
        if (provider == Provider.github) {
            this.avatar_url = org.avatar_url;
            this.description = org.description;
            this.display_name = org.login;
            this.slug = org.login;
        }else if (provider == Provider.gitlab) {
            this.avatar_url = org.avatar_url;
            this.description = org.description;
            this.display_name = org.login;
            this.slug = org.login;
        }else {
            this.avatar_url = org.avatar_url;
            this.description = org.description;
            this.display_name = org.login;
            this.slug = org.login;
        }
    }

    /** Organization web url
     * @github api response does't have this value so we will make it manually
     */
    get external_url(): string {
        switch (this.provider) {
            case Provider.github:
                return `https://github.com/${this.slug}`;
            case Provider.gitlab:
                // Leave it as is for now
                return `https://github.com/${this.slug}`;
            default:
                return `https://github.com/${this.slug}`;
        }
    }

    static getFromJson(json: any[], provider: Provider):Organization[] {
        return json.map((elem: any) => new Organization(elem, provider));
    }
}

export class OrganizationDetail {
    /** Organization create time
     * @github created_at
     */
    created_at: string;
    /** Organization email
     * @github email
     */
    email: string;
    /** Organization avatar url
     * @github avatar_url
     */
    avatar_url: string;
    /** Organization public web url
     * @github html_url
     */
    external_url: string;
    /** Organization description
     * @github description
     */
    description: string;
    /** Organization name
     * @github name
     */
    display_name: string;
    /** Organization slug
     * @github login
     */
    slug: string;
    /** Organization public repository counts
     * @github public_repos
     */
    repos: number;
    /** Data provider
     * @github Provider.github
     */
    provider: Provider;

    constructor(org: any, provider: Provider){
        this.provider = provider;
        if (provider == Provider.github) {
            this.created_at = org.created_at;
            this.avatar_url = org.avatar_url;
            this.external_url = org.html_url;
            this.description = org.description;
            this.display_name = org.name;
            this.slug = org.login;
            this.email = org.email;
            this.repos = org.public_repos;
        }else if (provider == Provider.gitlab) {
            this.created_at = org.created_at;
            this.avatar_url = org.avatar_url;
            this.external_url = org.html_url;
            this.description = org.description;
            this.display_name = org.name;
            this.slug = org.login;
            this.email = org.email;
            this.repos = org.public_repos;
        }else {
            this.created_at = org.created_at;
            this.avatar_url = org.avatar_url;
            this.external_url = org.html_url;
            this.description = org.description;
            this.display_name = org.name;
            this.slug = org.login;
            this.email = org.email;
            this.repos = org.public_repos;
        }
    }

    static getFromJson(json: any, provider: Provider):OrganizationDetail {
        return new OrganizationDetail(json, provider);
    }
}
