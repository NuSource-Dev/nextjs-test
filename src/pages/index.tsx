import React from "react";
import {NextPage} from 'next';
import {LandingPage, UserHome} from '@components/home';
import {withSessionSsr} from "@src/utils/helpers/iron-session";
import {User} from "@src/models";

interface Props {
    user?: User
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user;

        return {
            props: {
                user: user || null
            }
        };
    }
);

const Home: NextPage<Props> = ({user}) => {

    return (
        user?
            <UserHome user={user}/>
            : <LandingPage/>
    );
};

export default Home;
