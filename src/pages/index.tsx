import React, { useState } from "react";
import {NextPage} from 'next';
import { LandingPage, UserHome } from '@components/home';


const Home: NextPage = () => {
    const [user, setUser] = useState(null);

    if (!user) return <UserHome/>;
    else return <LandingPage/>;
};

export default Home;
