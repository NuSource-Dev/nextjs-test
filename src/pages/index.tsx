import React from "react";
import {NextPage} from 'next';
import {LandingPage, UserHome} from '@components/home';
import {withSessionSsr} from "@src/utils/helpers/iron-session";
import {Cookie} from "@src/models";

interface Props {
    cookie?: Cookie
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user;

        return {
            props: {
                cookie: user || null
            }
        };
    }
);

const Home: NextPage<Props> = ({cookie}) => {

    return (
        cookie?
            <UserHome cookie={cookie}/>
            : <LandingPage/>
    );
};

export default Home;
