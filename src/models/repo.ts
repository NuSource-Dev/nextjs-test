import {Provider} from "@src/api/provider-template";

export class Repository {
    /** Repository full name
     * @github full_name
     */
    full_name: string;
    /** Repository name
     * @github name
     */
    slug: string;
    /** Repository visibility
     * @github private
     */
    private: boolean;
    /** Repository public web url
     * @github html_url
     */
    external_url: string;
    /** Repository description
     * @github description
     */
    description: string;
    /** Repository create time
     * @github created_at
     */
    created_at: string;
    /** Repository push time
     * @github pushed_at
     */
    pushed_at: string;
    /** Repository update time
     * @github updated_at
     */
    updated_at: string;
    /** Repository forks count
     * @github forks_count
     */
    forks_count: number;
    /** Repository status
     * @github disabled
     */
    status: boolean;
    /** Repository language
     * @github language
     */
    language: string;

    /** Data provider
     * @github Provider.provider
     */
    provider: Provider;
    /**constructor
     * @param data
     * @param provider: Provider
     */
    constructor(data: any, provider: Provider) {
        this.provider = provider;
        this.full_name = data.full_name;
        this.slug = data.name;
        this.private = data.private;
        this.external_url = data.html_url;
        this.description = data.description;
        this.created_at = data.created_at;
        this.pushed_at = data.pushed_at;
        this.updated_at = data.updated_at;
        this.forks_count = data.forks_count;
        this.status = data.disabled;
        this.language = data.language;
    }

    static fromJson(json: any[], provider: Provider = Provider.github){
        return json.map((element: any) => new Repository(element, provider));
    }
}