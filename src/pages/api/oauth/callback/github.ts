import withSessionRoute from '@src/utils/helpers/iron-session';
import {Provider} from "@src/api/provider-template";
import {createAxiosInstance} from "@src/utils/helpers";

const axiosInstance = createAxiosInstance('https://github.com');

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

                const user = {
                    access_token: response.data.access_token,
                    vcs_slug: Provider.github
                };

                axiosInstance.get('/user', {
                    baseURL: 'https://api.github.com',
                    headers: {
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                }).then(userRes => {
                    req.session.user = {
                        ...user,
                        avatar_url: userRes.data.avatar_url,
                        external_url: userRes.data.html_url,
                        name: userRes.data.name,
                        slug: userRes.data.login,
                    };

                    req.session.save().then(() => {
                        res.redirect(301, '/');
                    });
                }).catch((error) => {
                    res.redirect(301, '/login');
                });
            }else {
                res.redirect(301, '/login');
            }
        })
        .catch((error) => {
            res.redirect(301, '/login');
        });
}