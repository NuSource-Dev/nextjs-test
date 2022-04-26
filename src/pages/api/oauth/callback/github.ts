import withSessionRoute from '@src/utils/helpers/iron-session';
import {createAxiosInstance} from "@src/utils/helpers";
import axios from "axios";
import {redirect} from "next/dist/server/api-utils";

const axiosInstance = createAxiosInstance('https://github.com');

export default withSessionRoute(handler);

function handler(req: any, res: any) {

    if (req.session.user) {
       return res.redirect(301, '/');
    }

    const {code, state} = req.query;

    if (!code || !state) {
        return res.redirect(301, '/login');
    }

    axios({
        url: process.env.BACKEND_URI + '/system/' + state,
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
                code
            })
            .then((response) => {

                if (!!response.data.access_token) {

                    req.session.user = {
                        app_id: credentialRes.data.app_id,
                        access_token: response.data.access_token,
                        expires_in: response.data.expires_in,
                        refresh_token: response.data.refresh_token,
                        refresh_token_expires_in: response.data.refresh_token_expires_in,
                        vcs: 'github'
                    };

                    req.session.save()
                        .then(() => {
                            res.redirect(301, '/');
                        });

                }else {
                    res.redirect(301, '/login');
                }
            })
            .catch((error) => {
                res.redirect(301, '/login');
            });
    }).catch(error => {
        res.redirect(301, '/login');
    })
}