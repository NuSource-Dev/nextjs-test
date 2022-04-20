import React, {useEffect} from "react";
import {NextPage} from 'next';
import {useRouter} from "next/router";
import Image from "next/image";
import Head from "next/head";
import {Button, Card, Stack, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GitLabIcon from '../../assets/icons/gitlab.svg';
import AuthLayout from '../../layout/auth.layout';
import {AuthHeader, AuthBrand, AuthContent} from "../../components/auth/index";
import {withSessionSsr} from "@src/utils/helpers/iron-session";
import {User} from "@src/models";


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {

        const res = await fetch(`http://${req.headers.host}/api/oauth/client`);
        const client_ids = await res.json();
        const user = req.session.user;

        return {
            props: {
                user: user || null,
                client_ids
            }
        };
    }
);

interface Props {
    client_ids: any,
    user?: User
}

const Index: NextPage<Props> = ({ client_ids, user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    });

    const githubLogin = () => {
        router.push(`https://github.com/login/oauth/authorize?client_id=${client_ids.github}&login=&scope=repo,user`);
    };

    return (
        <AuthLayout>
            <Head>
                <title>Login - NuSource</title>
                <meta name="description" content="NuSource Login"/>
            </Head>
            <AuthHeader>
                <AuthBrand onClick={()=> router.push('/')}>
                    <Typography variant="h5" color='text.primary'>NuSource</Typography>
                </AuthBrand>
            </AuthHeader>
            <AuthContent>
                <Typography variant="h6" align="center">Sign in to NuSource</Typography>
                <Card sx={{mt: 3, p: 3}}>
                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            color="primary"
                            variant="outlined"
                            startIcon={<GitHubIcon/>}
                            onClick={githubLogin}
                        >
                            Sign in with Github
                        </Button>
                        <Button
                            fullWidth
                            color="primary"
                            variant="outlined"
                            startIcon={<Image src={GitLabIcon} width={20} height={20} />}
                        >
                            Sign in with Gitlab
                        </Button>
                    </Stack>
                </Card>
            </AuthContent>
        </AuthLayout>
    );
};

export default Index;
