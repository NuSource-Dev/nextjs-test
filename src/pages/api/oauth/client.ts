export default async function handler (req: any, res: any) {
    try {
        res.status(200).json({
            github: process.env.GITHUB_CLIENT_ID,
            gitlab: process.env.GITLAB_CLIENT_ID
        });
    }catch (e) {
        res.status(500).json({e});
    }
}