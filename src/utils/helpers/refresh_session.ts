import {IncomingMessage} from "http";
import {NextApiRequestCookies} from "next/dist/server/api-utils";

const refresh_session_on_expired = async (req: IncomingMessage & { cookies: NextApiRequestCookies; }) => {
    const currentTime = new Date().getTime()/1000;

    if (req.session.user && currentTime > req.session.user.expire_at){
        try{
            const response = await fetch(
                `http://${req.headers.host}/api/oauth/refresh/${req.session.user.vcs}`,
                {
                    method: 'POST',
                    body: JSON.stringify(req.session.user)
                }
            );
            req.session.user = await response.json();
            await req.session.save();
        }catch (e) {
            req.session.destroy();
        }
    }
};

export default refresh_session_on_expired;