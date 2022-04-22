import {Provider} from "@src/api/provider-template";

export interface User {
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
    vcs_slug: Provider;
    /** VCS Oauth 2.0 access token
     * @github access_token
     */
    access_token: string;
}

export const user: User = {
    avatar_url: 'https://avatars.githubusercontent.com/u/6311784?v=4',
    external_url: 'https://github.com/rarkins',
    name: 'Rhys Arkins',
    slug: 'rarkins',
    access_token: '',
    vcs_slug: Provider.github
};

export default user;