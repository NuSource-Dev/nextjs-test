import React, {FC, useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {orgLoad} from "@src/redux/actions";
import {RootState} from "@src/redux/reducers";
import {Organization, User} from "@src/models";
import Layout from "@src/layout/layout";
import Header from "@src/layout/header";
import Content from "@src/layout/content";
import { OrgCard, OrgCardSkeleton } from "@components/home";

interface Props {
    user: User;
}

const UserHome: FC<Props> = ({user}) => {
    const router = useRouter();
    const orgState = useSelector((state: RootState) => state.org);
    const dispatch = useDispatch();

    useEffect(() => {
        if (orgState.orgs.length === 0)
            dispatch(orgLoad(user.vcs_slug));
    }, [user, orgState.orgs.length, dispatch]);

    return (
        <Layout>
            <Head>
                <title>Home - NuSource</title>
                <meta name="description" content="NuSource home page"/>
            </Head>
            <Header user={user}/>
            <Content>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Home</Typography>
                </Breadcrumbs>
                <Box sx={{p: 3}}>
                    <Typography variant="h5" sx={{mb: 4}}>Organizations</Typography>
                    <Grid container spacing={2}>
                        {
                            orgState.loading
                                ?[1,1,1,1].map((val, index) => (
                                    <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                                        <OrgCardSkeleton/>
                                    </Grid>
                                ))
                                : orgState.orgs.length === 0
                                ? <Grid item xs={12}>
                                    <Typography align="center" variant="h6">
                                        No organization!
                                    </Typography>
                                    <Typography align="center" variant="body1">
                                        You don&apos;t have any organization.
                                    </Typography>
                                </Grid>
                                :orgState.orgs.map((organization: Organization) =>
                                    (<Grid item lg={3} md={4} sm={6} xs={12} key={organization.slug}>
                                        <OrgCard
                                            org={organization}
                                            onClick={() => router.push(`/github/${organization.slug}`)}
                                        />
                                    </Grid>)
                                )
                        }
                    </Grid>
                </Box>
            </Content>
        </Layout>
    );
};

export default UserHome;