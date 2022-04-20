import axios from 'axios';
import withSessionRoute from '@src/utils/helpers/iron-session';
import {user} from "@src/models";
import {Provider} from "@src/api/provider-template";

const axiosInstance = axios.create({
    baseURL: 'https://github.com',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Accept": "application/json"
    }
});

export default withSessionRoute(handler);

function handler(req: any, res: any) {
    const {code} = req.query;

    axiosInstance.post(
        '/login/oauth/access_token',
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        })
        .then((response) => {
            if (!!response.data.access_token) {

                req.session.user = {
                    ...user,
                    ...response.data.access_token,
                    auth_provider: Provider.github
                };

                req.session.save().then(() => {
                    res.redirect(301, '/');
                });
            }else {
                res.redirect(301, '/login');
            }
        })
        .catch((error) => {
            res.redirect(301, '/login');
        });
}