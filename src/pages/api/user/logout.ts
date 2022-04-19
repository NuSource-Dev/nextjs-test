import withSessionRoute from '@src/utils/helpers/iron-session';

export default withSessionRoute(handler);

function handler(req: any, res: any) {
    if (req.session.user){
        req.session.destroy();
        return res.status(200).json({success: true});
    }
    else
        res.status(401).json({success: false, message: 'Not Authorized'});
}