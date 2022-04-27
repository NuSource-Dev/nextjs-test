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
import {Cookie, Repository} from "@src/models";
import {refresh_session_on_expire, timeFormatter} from '@src/utils/helpers';
import {RootState} from "@src/redux/reducers";
import {orgDetailLoad, orgReposLoad, userReposLoad} from "@src/redux/actions";
import {withSessionSsr} from "@src/utils/helpers/iron-session";

interface Props {
    cookie?: Cookie
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const cookie = req.session.user;
        await refresh_session_on_expire(req);

        return {
            props: {
                cookie: cookie || null
            }
        };
    }
);

const Organization: NextPage<Props> = ({ cookie }) => {
    // Get slug from the url
    const router = useRouter();
    const {slug} = router.query;

    // Detect screen size to decide card/table view
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    // Get redux state
    const repoState = useSelector((state: RootState) => state.repo);
    const orgState = useSelector((state: RootState) => state.org);
    const userState = useSelector((state:RootState) =>state.user);
    const dispatch = useDispatch();

    // View mode: GridView | TableView
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

    // Filters applied repositories and organization details
    const [repositories, setRepositories] = useState<Repository[]>([]);

    // Filters
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [privateFilter, setPrivate] = useState<string | boolean>('');
    const [status, setStatus] = useState<string | boolean>('');

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
        if (!!repoState.repos)
            setRepositories(repoState.repos
                .filter((elem: Repository) =>
                    elem.slug.includes(searchTerm)
                    && (privateFilter === '' || elem.private === privateFilter)
                    && (status === '' || elem.status === status)
                )
            );
    }, [
        searchTerm,
        privateFilter,
        status,
        repoState
    ]);

    // Dispatch load detail action at the first load
    useEffect(() => {
        dispatch(orgDetailLoad('github', slug));
    }, [cookie, dispatch, slug]);

    useEffect(() => {
        if(orgState.detail){
            if (orgState.detail.type === 'User') {
                dispatch(userReposLoad('github', slug));
            }else {
                dispatch(orgReposLoad('github', slug));
            }
        }
    },[orgState.detail, dispatch]);

    return (
        <Layout cookie={cookie}>
            <Head>
                <title>Organization - NuSource</title>
                <meta name="description" content="Organization"/>
            </Head>
            <Header user={userState.user}/>
            <Content>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Github</Typography>
                    <Typography color="text.primary">
                        {slug}
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
                                    orgState.loading ?
                                        <Skeleton variant="circular" sx={{width: 25, height: 25}}/>
                                        : <Avatar
                                            sx={{width: 25, height: 25}}
                                            variant="square"
                                            src={orgState.detail?.avatar_url}
                                            alt={orgState.detail?.slug}
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
                                    Name:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                {
                                    orgState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Typography variant="body2">
                                            {orgState.detail?.name || '-'}
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
                                    Type:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                {
                                    orgState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Typography variant="body2">
                                            {orgState.detail?.type || '-'}
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
                                    orgState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Link href={orgState.detail?.external_url} target="_blank">
                                            <Typography variant="body2" component="span">
                                                {orgState.detail?.external_url}
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
                                    Public Repos:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                {
                                    orgState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Typography variant="body2" component="span">
                                            {orgState.detail?.repos}
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
                                    Added date:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                {
                                    orgState.loading ?
                                        <Skeleton variant="text"/>
                                        : <Typography variant="body2">
                                            {timeFormatter(orgState.detail?.created_at)}
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
                                    onChange={(e) => setStatus(getBooleanValue(e.target.value))}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="false">Enabled</MenuItem>
                                    <MenuItem value="true">Disabled</MenuItem>
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