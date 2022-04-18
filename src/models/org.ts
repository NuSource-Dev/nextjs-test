export interface Organization {
    avatar_url?: string;
    description?: string;
    display_name: string;
    external_url?: string;
    repo_count: number;
    slug: string;
}

const organizations: Organization[] = [
    {
        avatar_url: 'https://avatars.githubusercontent.com/u/38656520?v=4',
        display_name: 'Renovate Bot',
        repo_count: 21,
        slug: 'renovatebot'
    },
    {
        avatar_url: 'https://avatars.githubusercontent.com/u/6311784?v=4',
        display_name: 'Rhys Arkins',
        description: 'Creator of @renovate-bot, Senior Director of Product @WhiteSource',
        repo_count: 3,
        slug: 'rarkins'
    },
    {
        avatar_url: 'https://avatars.githubusercontent.com/u/81097139?v=4',
        external_url: 'https://github.com/containerbase',
        display_name: 'Container Base',
        repo_count: 15,
        slug: 'containerbase'
    }
];

export default organizations;