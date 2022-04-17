import React, { useEffect, useState } from "react";
import { NextPage } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router'
import {
    Avatar,
    Box,
    Breadcrumbs, FormControl,
    Grid,
    IconButton, InputLabel,
    Link, MenuItem, Select,
    Stack,
    TextField,
    Theme,
    Typography,
    useMediaQuery
} from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import TableViewIcon from '@mui/icons-material/TableView';
import Layout from "@src/layout/layout";
import Header from "@src/layout/header";
import Content from "@src/layout/content";
import { GridView, TableView } from "@components/org";
import { orgDetail, Repository } from "@src/dummy";
import timeFormatter from '@src/utils/helpers/time-formatter';

const Organization: NextPage = () => {
    const router = useRouter();
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const {slug} = router.query;

    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [privateFilter, setPrivate] = useState<string|boolean>('');
    const [status, setStatus] = useState<string>('');
    const [stale, setStale] = useState<string|boolean>('');
    const [manager, setManager] = useState<string>('');

    const toggleViewMode = () => {
        setViewMode(prevState => {
            if (prevState === 'table'){
                return 'grid';
            }
            else return 'table';
        });
    };

    const getBooleanValue = (value: any) => {
        if (value === 'true') return true;
        else if (value === 'false') return false;
        return value;
    };

    useEffect(() => {
        setRepositories(orgDetail.repositories
            .filter((elem) =>
                elem.slug.includes(searchTerm)
                && (privateFilter === '' || elem.private === privateFilter)
                && (status === '' || elem.status === status)
                && (stale === '' || elem.stale === stale)
                && (manager === '' || elem.managers.includes(manager))
            )
        );
    }, [
        searchTerm,
        privateFilter,
        status,
        stale,
        manager
    ]);

    return (
        <Layout>
            <Head>
                <title>Organization - NuSource</title>
                <meta name="description" content="Organization"/>
            </Head>
            <Header/>
            <Content>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Github</Typography>
                    <Typography color="text.primary">
                        {slug} ({orgDetail.display_name})
                    </Typography>
                </Breadcrumbs>
                <Box sx={{p: 3}}>
                    <Stack spacing={1}>
                        <Grid container>
                            <Grid item xs={12} sm={2}>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    Avatar:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Avatar
                                    sx={{width: 25, height: 25, mt: '0!important'}}
                                    variant="square"
                                    src={orgDetail?.avatar_url}
                                    alt={orgDetail?.display_name}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={2}>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    Description:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Typography variant="body2">
                                    {orgDetail?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={2}>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    External URL:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Link href={orgDetail?.external_url} target="_blank">
                                    <Typography variant="body2" component="span">
                                        {orgDetail?.external_url}
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={2}>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    Added date / person:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Typography variant="body2">
                                    {orgDetail?.added_by} added at {timeFormatter(orgDetail.added_at)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="h5">Repositories</Typography>
                    </Box>
                    <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        sx={{mt: {xs: 4, sm: 0.5}}}
                    >
                        <TextField
                            label="Search"
                            color="secondary"
                            variant="filled"
                            size="small"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div>
                            <IconButton
                                title={viewMode === 'table' ? 'Grid View' : 'Table View'}
                                onClick={toggleViewMode}
                            >
                                {
                                    viewMode === 'table' ?
                                        <GridViewIcon/>
                                        :<TableViewIcon/>
                                }
                            </IconButton>
                        </div>
                    </Stack>
                    <Grid container spacing={2} sx={{mt: 1}}>
                        <Grid item xs={12} sm={3}>
                            <FormControl sx={{ minWidth: 120 }} fullWidth={!sm}>
                                <InputLabel id="private-select">Private</InputLabel>
                                <Select
                                    labelId="private-select"
                                    value={privateFilter}
                                    label="Is private"
                                    onChange={(e) => setPrivate(getBooleanValue(e.target.value))}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="true">Yes</MenuItem>
                                    <MenuItem value="false">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl sx={{ minWidth: 120 }} style={{marginTop: 0}}  fullWidth={!sm}>
                                <InputLabel id="status-select">Status</InputLabel>
                                <Select
                                    labelId="status-select"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="enabled">Enabled</MenuItem>
                                    <MenuItem value="disabled">Disabled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl sx={{ minWidth: 120 }} style={{marginTop: 0}} fullWidth={!sm}>
                                <InputLabel id="stale-select">Stale</InputLabel>
                                <Select
                                    labelId="stale-select"
                                    value={status}
                                    label="Stale"
                                    onChange={(e) => setStale(getBooleanValue(e.target.value))}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="true">Yes</MenuItem>
                                    <MenuItem value="false">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl sx={{ minWidth: 120 }} style={{marginTop: 0}} fullWidth={!sm}>
                                <InputLabel id="manager-select">Manager</InputLabel>
                                <Select
                                    labelId="manager-select"
                                    value={manager}
                                    label="Manager"
                                    onChange={(e) => setManager(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="npm">Npm</MenuItem>
                                    <MenuItem value="dockerfile">Docker</MenuItem>
                                    <MenuItem value="github-actions">Github Action</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {
                        viewMode === 'table' ?
                            <TableView repositories={repositories}/>
                            : <GridView repositories={repositories}/>
                    }
                </Box>
            </Content>
        </Layout>
    );
};

export default Organization;