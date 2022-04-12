import * as React from "react";
import{ NextPage } from 'next';
import Head from 'next/head';
import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import Layout from '@src/layout/layout';
import Header from "@src/layout/header";
import Content from "@src/layout/content";
import { Organization, organizations } from '@src/dummy';
import OrgCard from "@components/org-card";

const Home: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Home - NuSource</title>
                <meta name="description" content="NuSource home page"/>
            </Head>
            <Header/>
            <Content>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Home</Typography>
                </Breadcrumbs>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        {
                            organizations.map((organization: Organization) =>
                                (<Grid item lg={3} md={4} sm={6} xs={12} key={organization.slug}>
                                    <Link href={`/github/${organization.slug}`} sx={{ textDecoration: 'none' }}>
                                        <OrgCard org={organization}/>
                                    </Link>
                                </Grid>))
                        }
                    </Grid>
                </Box>

            </Content>
        </Layout>
    );
};

export default Home
