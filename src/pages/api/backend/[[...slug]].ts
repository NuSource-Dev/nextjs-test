import withSessionRoute from '@src/utils/helpers/iron-session';
import {AxiosError, AxiosResponse, Method} from "axios";
import axios from "axios";

export default withSessionRoute(handler);

function handler(req: any, res: any) {

    const { slug } = req.query;
    const url = req.url?.replace('/api/backend', '').trim();
    let authorization = slug[0] === 'system' ? process.env.API_SECRET : req.session.user?.access_token;

    const body = req.body;

    const base_url: string = (process.env.NODE_ENV === "production"
        ? process.env.BACKEND_URI_PROD : process.env.BACKEND_URI) || '';

    axios({
        url: `${base_url}${url}`,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Accept": "application/json",
            "Authorization": authorization? `Bearer ${authorization}`: ''
        },
        method: req.method as Method,
        data: body
    })
        .then((response: AxiosResponse) => {
            res.status(response.status).json(response.data);
        })
        .catch((error: AxiosError) => {
            res.status(error.response? error.response.status : 500)
                .json({data: error.response?.data});
        });
}