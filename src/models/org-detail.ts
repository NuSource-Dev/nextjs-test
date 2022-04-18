export interface Repository {
    dependency_count: number;
    full_name: string;
    managers: string[],
    pr_count?: number;
    private?: boolean;
    slug: string;
    stale: boolean;
    status: string;
    update_count: number;
}

export interface OrgDetail {
    added_at: string;
    added_by: string;
    avatar_url?: string;
    external_id: number;
    external_url?: string;
    description?: string;
    display_name: string;
    repositories: Repository[]
    slug: string;
}

const orgDetail: OrgDetail = {
    added_at: '2018-02-18 07:56:12Z',
    added_by: 'rarkins',
    avatar_url: 'https://avatars.githubusercontent.com/u/38656520?v=4',
    external_id: 38656520,
    external_url: 'https://github.com/renovatebot',
    description: 'The home of Renovate, a bot for automated dependency updates',
    display_name: 'Renovate Bot',
    repositories: [
        {
            dependency_count: 56,
            full_name: 'renovatebot/renovate',
            managers: [
                'npm',
                'dockerfile',
                'github-actions'
            ],
            private: false,
            slug: 'renovate',
            stale: false,
            status: 'enabled',
            update_count: 16
        },
        {
            dependency_count: 56,
            full_name: 'renovatebot/renovate1',
            managers: [
                'npm',
                'dockerfile',
                'github-actions'
            ],
            pr_count: 1,
            private: false,
            slug: 'renovate1',
            stale: false,
            status: 'enabled',
            update_count: 16
        },
        {
            dependency_count: 12,
            full_name: 'renovatebot/docker-renovate',
            managers: [
                'npm',
                'dockerfile',
                'github-actions'
            ],
            pr_count: 0,
            private: false,
            slug: 'docker-renovate',
            stale: false,
            status: 'enabled',
            update_count: 2
        },
        {
            dependency_count: 34,
            full_name: 'renovatebot/backend',
            managers: [
                'npm',
                'dockerfile',
                'github-actions'
            ],
            pr_count: 2,
            private: true,
            slug: 'backend',
            stale: false,
            status: 'enabled',
            update_count: 9
        }
    ],
    slug: 'renovatebot'
};

export default orgDetail;