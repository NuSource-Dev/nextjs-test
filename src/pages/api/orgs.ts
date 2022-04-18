import { organizations } from '@src/models';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default async function handler (req: any, res: any) {
    try {
        await delay(2000);
        res.status(200).json(organizations);
    }catch (e) {
        res.status(500).json({e});
    }
}