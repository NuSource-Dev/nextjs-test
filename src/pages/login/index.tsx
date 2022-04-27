import React, {useEffect, useState} from "react";
import {NextPage} from 'next';
import {useRouter} from "next/router";
import Image from "next/image";
import Head from "next/head";
import {Button, Card, Stack, Typography, Modal, Box} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GitLabIcon from '@src/assets/icons/gitlab.svg';
import AuthLayout from '@src/layout/auth.layout';
import {AuthHeader, AuthBrand, AuthContent} from "@src/components/auth/index";
import {withSessionSsr} from "@src/utils/helpers/iron-session";
import {User} from "@src/models";


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {

        const res = await fetch(`http://${req.headers.host}/api/backend/system`);
        const system = await res.json();
        const user = req.session.user;

        return {
            props: {
                user: user || null,
                system
            }
        };
    }
);

interface Props {
    system: any,
    user?: User
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
};

const Index: NextPage<Props> = ({ system, user }) => {

    const router = useRouter();
    const [apps, setApps] = useState<any[] | null>(null);

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    });

    const githubLogin = (app: any) => {
        router.push(`https://github.com/login/oauth/authorize?client_id=${app.client_id}&redirect_uri=${window.location.origin}/api/oauth/callback/github&scope=repo,user&state=${app.app_id}`);
    };

    const getVCSApps = (vcs: string): any[] => {
        return system.apps.filter((app: any) => app.vcs = vcs);
    };

    const githubButton = () => {
        const githubApps = getVCSApps('github');
        if (githubApps.length === 1){
            githubLogin(githubApps[0]);
        }else if (githubApps.length > 1) {
            setApps(githubApps);
        }
    };

    const handleClose = () => {
        setApps(null);
    };

    return (
        <AuthLayout>
            <Head>
                <title>Login - {system.display_name}</title>
                <meta name="description" content="NuSource Login"/>
            </Head>
            <AuthHeader>
                <AuthBrand onClick={()=> router.push('/')}>
                    <Typography variant="h5" color='text.primary'>
                        {system.display_name}
                    </Typography>
                </AuthBrand>
            </AuthHeader>
            <AuthContent>
                <Typography variant="h6" align="center">
                    Sign in to {system.display_name}
                </Typography>
                <Card sx={{mt: 3, p: 3}}>
                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            color="primary"
                            variant="outlined"
                            startIcon={<GitHubIcon/>}
                            onClick={githubButton}
                        >
                            Sign in with Github
                        </Button>
                        <Button
                            fullWidth
                            color="primary"
                            variant="outlined"
                            startIcon={<Image src={GitLabIcon} width={20} height={20} alt="Gitlab" />}
                        >
                            Sign in with Gitlab
                        </Button>
                    </Stack>
                </Card>
            </AuthContent>
            <Modal
                open={!!apps}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography align="center">Select the app</Typography>
                        {apps && apps.map((app, index) =>
                            <Button
                                key={index}
                                fullWidth
                                color="primary"
                                variant="outlined"
                                startIcon={<GitHubIcon/>}
                                onClick={() => githubLogin(app)}
                            >
                                {app.display_name}
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Modal>
        </AuthLayout>
    );
};

export default Index;
