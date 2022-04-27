import {createAxiosInstance} from "@src/utils/helpers";
import axios from "axios";
import {NextApiRequest} from "next";


export default function handler(req: NextApiRequest, res: any) {
    const body = JSON.parse(req.body);

        const axiosInstance = createAxiosInstance('https://github.com');

        axios({
            url: process.env.BACKEND_URI + '/system/apps/' + body.app_id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Accept": "*/*",
                "Authorization": `Bearer ${process.env.API_SECRET}`
            }
        }).then(credentialRes => {
            axiosInstance.post(
                '/login/oauth/access_token',
                {
                    client_id: credentialRes.data.client_id,
                    client_secret: credentialRes.data.client_secret,
                    refresh_token: body.refresh_token,
                    grant_type: 'refresh_token'
                })
                .then((response) => {

                    if (!!response.data.access_token) {

                        const cookie = {
                            app_id: credentialRes.data.app_id,
                            access_token: response.data.access_token,
                            expires_in: response.data.expires_in,
                            refresh_token: response.data.refresh_token,
                            refresh_token_expires_in: response.data.refresh_token_expires_in,
                            vcs: 'github',
                            expire_at: Math.round(new Date().getTime() /1000) + response.data.expires_in
                        };

                        res.status(200).json(cookie);

                    }else {
                        res.status(400).send('Unauthorized');
                    }
                })
                .catch((error) => {
                    res.status(400).send('Unauthorized');
                });
        }).catch(error => {
            res.status(400).send('Unauthorized');
        })
}