import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@mui/material";
import Layout from "@src/layout/layout";
import {styled} from "@mui/material";
import {useRouter} from "next/router";

const MainContent = styled('div')`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left:50%;
  .login-button-wrapper {
    width: 300px;
    margin: 40px auto auto auto;
  }
`;

const LandingPage: FC = props => {
    const router = useRouter();
    return (
        <Layout>
            <Head>
                <title>Home - NuSource</title>
                <meta name="description" content="NuSource home page"/>
            </Head>
            <MainContent>
                <Image src="/vcs.png" alt="VCS" width={600} height={300}/>
                <div className="login-button-wrapper">
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </Button>
                </div>
            </MainContent>
        </Layout>
    );
};

export default LandingPage;