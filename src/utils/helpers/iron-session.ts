import {Cookie} from "@src/models";
import {withIronSessionApiRoute, withIronSessionSsr} from "iron-session/next";
import {GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler} from "next";

const ironOptions = {
    password: 'BcX*wH4^ceFUNU93>hm1dj7)]DAuD!9c%766]^r+',
    cookieName: 'nusource_iron_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
};

const withSessionRoute = (handler: NextApiHandler): NextApiHandler =>
    withIronSessionApiRoute(handler, ironOptions);

export function withSessionSsr<
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    >(
    handler: (
        context: GetServerSidePropsContext,
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
    return withIronSessionSsr(handler, ironOptions);
}

declare module "iron-session" {

    interface IronSessionData {
        user?: Cookie;
    }
}

export default withSessionRoute;

