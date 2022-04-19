import withSessionRoute from '@src/utils/helpers/iron-session';

export default withSessionRoute(handler);

function handler(req: any, res: any) {
    if (req.session.user)
        res.status(200).json({user: req.session.user});
    else
        res.status(401).json({success: false, message: 'Not Authorized'});
}