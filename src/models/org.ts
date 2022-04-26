export class Organization {
    /** Organization avatar url
     * @github avatar_url
     */
    avatar_url: string;
    /** Organization web url
     * @github html_url
     */
    external_url: string;
    /** Organization description
     * @github description
     */
    description: string;
    /** Organization display name
     * @github login (it should be display name but api doesn't return display name)
     */
    display_name: string;
    /** role */
    role: string;
    /** Organization slug
     * @github login
     */
    slug: string;
    /** Account type
     *
     */
    type: 'Organization' | 'User';
    /** Api provider
     * @github github
     * @gitlab gitlab
     */
    vcs: string;

    /** constructor
     * @param org
     */
    constructor(org: any){
        this.avatar_url = org.avatar_url;
        this.description = org.description;
        this.display_name = org.name;
        this.external_url = org.html_url;
        this.role = org.role;
        this.slug = org.login;
        this.type = org.type;
        this.vcs = org.vcs;
    }

    static getFromJson(json: any[]):Organization[] {
        return json.map((elem: any) => new Organization(elem.account));
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
    vcs: string;
    /** type */
    type: 'Organization' | 'User';

    constructor(org: any){
        this.avatar_url = org.avatar_url;
        this.created_at = org.created_at;
        this.description = org.description;
        this.display_name = org.name;
        this.email = org.billing_email;
        this.external_url = org.html_url;
        this.repos = org.public_repos;
        this.slug = org.login;
        this.vcs = org.vcs;
        this.type = org.type;
    }

    static fromJson(json: any):OrganizationDetail {
        return new OrganizationDetail(json);
    }
}
