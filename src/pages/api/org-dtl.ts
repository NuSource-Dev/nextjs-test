import { orgDetail } from '@src/models';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default async function handler (req: any, res: any) {
    try {
        await delay(3000);
        res.status(200).json(orgDetail);
    }catch (e) {
        res.status(500).json({e});
    }
}