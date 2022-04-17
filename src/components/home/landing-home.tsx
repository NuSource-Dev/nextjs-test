import React, { FC } from "react";
import Head from "next/head";
import LandingLayout from "@src/layout/landing.layout";
import LandingHeader from "@src/layout/landing.header";

const LandingPage: FC = props => {
    return (
        <LandingLayout>
            <Head>
                <title>Home - NuSource</title>
                <meta name="description" content="NuSource home page"/>
            </Head>
            <LandingHeader/>
            Landing page
        </LandingLayout>
    );
};

export default LandingPage;