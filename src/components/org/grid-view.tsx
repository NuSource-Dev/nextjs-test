import React, { FC } from "react";
import { Box, Grid } from "@mui/material";
import { Repository } from "@src/dummy";
import { RepoCard } from "@components/org";

interface Props {
    repositories: Repository[]
}

const GridView: FC<Props> = ({ repositories }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                {
                    repositories.map(
                        (repo: Repository) =>
                            <Grid item lg={3} md={4} sm={6} xs={12}  key={repo.slug}>
                                <RepoCard repository={repo}/>
                            </Grid>
                    )
                }
            </Grid>
        </Box>
    );
};

export default GridView;