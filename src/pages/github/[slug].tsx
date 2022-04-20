import React, {useEffect, useState} from "react";
import {NextPage} from 'next';
import Head from "next/head";
import {useRouter} from 'next/router'
import {
    Avatar,
    Box,
    Breadcrumbs,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    TextField,
    Theme,
    Typography,
    useMediaQuery
} from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import TableViewIcon from '@mui/icons-material/TableView';
import {useDispatch, useSelector} from "react-redux";
import Layout from "@src/layout/layout";
import Header from "@src/layout/header";
import Content from "@src/layout/content";
import {GridView, TableView} from "@components/org";
import {Repository} from "@src/models";
import {timeFormatter} from '@src/utils/helpers';
import {RootState} from "@src/redux/reducers";
import {repoLoad} from "@src/redux/actions";
import {withSessionSsr} from "@src/utils/helpers/iron-session";

interface Props {
    user: any
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user;

        return {
            props: {
                user: user || null
            },
        };
    },
);

const Organization: NextPage<Props> = ({ user }) => {
    // Get slug from the url
    const router = useRouter();
    const {slug} = router.query;

    // Detect screen size to decide card/table view
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    // Get redux state
    const repoState = useSelector((state: RootState) => state.repo);
    const dispatch = useDispatch();

    // View mode: GridView | TableView
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

    // Filters applied repositories
    const [repositories, setRepositories] = useState<Repository[]>([]);

    // Filters
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [privateFilter, setPrivate] = useState<string | boolean>('');
    const [status, setStatus] = useState<string>('');
    const [stale, setStale] = useState<string | boolean>('');
    const [manager, setManager] = useState<string>('');

    // Toggle view mode
    const toggleViewMode = () => {
        setViewMode(prevState => {
            if (prevState === 'table') {
                return 'grid';
            }
            else return 'table';
        });
    };

    // Get boolean value from select field feed "true" OR "false"
    const getBooleanValue = (value: any) => {
        if (value === 'true') return true;
        else if (value === 'false') return false;
        return value;
    };

    // Update repositories when redux state change or page filters had been changed
    useEffect(() => {
        if (!!repoState.orgDetail)
            setRepositories(repoState.orgDetail.repositories
                .filter((elem: Repository) =>
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
        manager,
        repoState
    ]);

    // Dispatch load detail action at the first load
    useEffect(() => {
        if (!repoState.orgDetail || repoState.orgDetail.slug !== slug) {
            dispatch(repoLoad({username: user?.slug, slug: 'github'}));
        }
    }, []);

    return (
        <Layout user={user}>
            <Head>
                <title>Organization - NuSource</title>
                <meta name="description" content="Organization"/>
            </Head>
            <Header user={user}/>
            <Content>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Github</Typography>
                    <Typography color="text.primary">
                        {slug} ({repoState.orgDetail?.display_name})
                    </Typography>
                </Breadcrumbs>
                <Box sx={{p: 3}}>
                    <Stack spacing={1}>
                        <Grid container>
                            <Grid item xs={4} sm={2}>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    Avatar:
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                                {
                                    repoState.loading ?
                                        <Skeleton variant="circular" sx={{width: 25, height: 25}}/>
                                        : <Avatar
                                            sx={{width: 25, height: 25}}
                                            variant="square"
                                            src={repoState.orgDetail?.avatar_url}
                                            alt={repoState.orgDetail?.display_name}
                                        />
                                }

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
                                {
                                    repoState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Typography variant="body2">
                                            {repoState.orgDetail?.description}
                                        </Typography>
                                }
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
                                {
                                    repoState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Link href={repoState.orgDetail?.external_url} target="_blank">
                                            <Typography variant="body2" component="span">
                                                {repoState.orgDetail?.external_url}
                                            </Typography>
                                        </Link>
                                }

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
                                {
                                    repoState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Typography variant="body2">
                                            {repoState.orgDetail?.added_by} added at{' '}
                                            {timeFormatter(repoState.orgDetail?.added_at)}
                                        </Typography>
                                }

                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{mt: 2, mb: 2}}>
                        <Typography variant="h5">Repositories</Typography>
                    </Box>
                    <Stack
                        flexDirection="row"
                        gap={4}
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
                                        : <TableViewIcon/>
                                }
                            </IconButton>
                        </div>
                    </Stack>
                    <Grid container spacing={2} sx={{mt: 1}}>
                        <Grid item xs={12} sm={3}>
                            <FormControl sx={{minWidth: 120}} fullWidth={!sm}>
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
                            <FormControl sx={{minWidth: 120}} style={{marginTop: 0}} fullWidth={!sm}>
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
                            <FormControl sx={{minWidth: 120}} style={{marginTop: 0}} fullWidth={!sm}>
                                <InputLabel id="stale-select">Stale</InputLabel>
                                <Select
                                    labelId="stale-select"
                                    value={stale}
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
                            <FormControl sx={{minWidth: 120}} style={{marginTop: 0}} fullWidth={!sm}>
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
                        viewMode === 'table' && sm ?
                            <TableView repositories={repositories} loading={repoState.loading}/>
                            : <GridView repositories={repositories} loading={repoState.loading}/>
                    }
                </Box>
            </Content>
        </Layout>
    );
};

export default Organization;