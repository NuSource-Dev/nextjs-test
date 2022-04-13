import React from "react";
import{ NextPage } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router'
import {
Avatar,
Box,
Breadcrumbs,
Grid,
IconButton,
Link, Paper,
Stack,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
TextField,
Typography,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Layout from "@src/layout/layout";
import Header from "@src/layout/header";
import Content from "@src/layout/content";

import { orgDetail } from "@src/dummy";

const Organization: NextPage = () => {
    const router = useRouter();
    const { org, slug } = router.query;

    return (
        <Layout>
            <Head>
                <title>Organization - NuSource</title>
                <meta name="description" content="Organization"/>
            </Head>
            <Header/>
            <Content>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit">
                        {org}
                    </Link>
                    <Typography color="text.primary">{slug} ({orgDetail.display_name})</Typography>
                </Breadcrumbs>
                <Box sx={{ p: 3 }}>
                    <Stack spacing={1}>
                        <Grid container>
                            <Grid item xs={4} sm={2}>
                                <Typography variant="subtitle1">Avatar: </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                                <Avatar
                                    sx={{ width: 25, height: 25, mt: '0!important' }}
                                    variant="square"
                                    src={orgDetail?.avatar_url}
                                    alt={orgDetail?.display_name}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} sm={2}>
                                <Typography variant="subtitle1">Description: </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                                <Typography variant="body1">{orgDetail?.description}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} sm={2}>
                                <Typography variant="subtitle1">External URL: </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                                <Link href={orgDetail?.external_url} target="_blank">
                                    <Typography variant="body1">{orgDetail?.external_url}</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} sm={2}>
                                <Typography variant="subtitle1">Added date / person: </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                                <Typography variant="body1">{orgDetail?.added_by} added at {orgDetail.added_at}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Stack flexDirection="row" justifyContent="flex-end">
                        <TextField label="Search" color="secondary" variant="filled" size="small" />
                        <IconButton aria-label="delete">
                            <FilterAltIcon />
                        </IconButton>
                    </Stack>
                    <TableContainer component={Paper} sx={{mt: 2}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full name</TableCell>
                                    <TableCell align="right">Is private</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Stale</TableCell>
                                    <TableCell align="right">Update count</TableCell>
                                    <TableCell align="right">Pull request count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orgDetail.repositories.map((row) => (
                                    <TableRow
                                        key={row.slug}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.full_name}
                                        </TableCell>
                                        <TableCell align="right">{row.private}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right">{row.stale}</TableCell>
                                        <TableCell align="right">{row.update_count}</TableCell>
                                        <TableCell align="right">{row.pr_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Content>
        </Layout>
    );
};

export default Organization;