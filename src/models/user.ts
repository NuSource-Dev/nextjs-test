import {Provider} from "@src/api/provider-template";

export interface User {
    avatar_url: string;
    external_url: string;
    name: string;
    slug: string;
    vcs_slug: string;
    access_token?: string;
    auth_provider?: Provider
}

export const user: User = {
    avatar_url: 'https://avatars.githubusercontent.com/u/6311784?v=4',
    external_url: 'https://github.com/rarkins',
    name: 'Rhys Arkins',
    slug: 'rarkins',
    vcs_slug: 'github'
};

export default user;