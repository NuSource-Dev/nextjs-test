import React, {FC} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {Repository} from "@src/models";
import {RepoCard, RepoCardSkeleton} from "@components/org";

interface Props {
    loading: boolean;
    repositories: Repository[]
}

const GridView: FC<Props> = ({repositories, loading}) => {
    return (
        <Box sx={{mt: 4}}>
            <Grid container spacing={2}>
                {
                    loading ?
                        <>
                            {
                                [0,1,2,3].map((value) => (
                                    <Grid item lg={3} md={4} sm={6} xs={12} key={value}>
                                        <RepoCardSkeleton/>
                                    </Grid>
                                ))
                            }
                        </>
                        : repositories.length === 0 ?
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                align="center"
                                color="text.secondary"
                            >
                                No result
                            </Typography>
                        </Grid>
                        : repositories.map(
                            (repo: Repository) =>
                                <Grid item lg={3} md={4} sm={6} xs={12} key={repo.slug}>
                                    <RepoCard repository={repo}/>
                                </Grid>
                        )
                }
            </Grid>
        </Box>
    );
};

export default GridView;