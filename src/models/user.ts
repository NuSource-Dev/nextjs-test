export class User {
    /** User avatar url
     * @github avatar_url
     */
    avatar_url: string;
    /** User public web profile url
     * @github html_url
     */
    external_url: string;
    /** User profile name
     * @github name
     */
    name: string;
    /** User profile slug
     * @github login
     */
    slug: string;
    /** VCS slug
     * @github github
     * @gitlab gitlab
     */
    vcs: string;

    constructor(data: any) {
        this.avatar_url = data.avatar_url;
        this.external_url = data.html_url;
        this.name = data.name;
        this.slug = data.login;
        this.vcs = data.vcs;
    }

    static fromJson(json: any) {
        return new User(json);
    };
}