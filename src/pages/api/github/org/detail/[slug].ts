import {createAxiosInstance} from "@src/utils/helpers/index";
import withSessionRoute from "@src/utils/helpers/iron-session";

export default withSessionRoute(handler);

function handler (req: any, res: any) {
    const {slug} = req.query;
    const axiosInstance = createAxiosInstance('https://api.github.com', req.session.user?.access_token);

    axiosInstance.get(`/orgs/${slug}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
}