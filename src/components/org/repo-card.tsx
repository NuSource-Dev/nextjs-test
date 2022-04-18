import React, {FC} from "react";
import {Card, Grid, Skeleton, Stack, styled, Typography} from "@mui/material";
import {Repository} from "@src/models";

interface Props {
    repository: Repository;
}

const CustomCard = styled(Card)`
  padding: 15px;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.default};
`;

const RepoCard: FC<Props> = ({repository}) => {
    return (
        <CustomCard>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Full name:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.full_name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Slug:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.slug}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Is private:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.private ? 'Yes' : 'No'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Status:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.status}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Stale:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.stale ? 'Yes' : 'No'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Update Count:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.update_count}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        PR count:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: 'bold'}}
                    >
                        {repository.pr_count || '-'}
                    </Typography>
                </Grid>
            </Grid>
        </CustomCard>
    );
};

export const RepoCardSkeleton: FC = () => (
    <CustomCard>
        <Skeleton variant="text" sx={{width: '100%'}}/>
        <Skeleton variant="text" sx={{width: '100%'}}/>
        <Skeleton variant="text" sx={{width: '100%'}}/>
        <Skeleton variant="text" sx={{width: '100%'}}/>
        <Skeleton variant="text" sx={{width: '100%'}}/>
        <Skeleton variant="text" sx={{width: '100%'}}/>
        <Skeleton variant="text" sx={{width: '100%'}}/>
    </CustomCard>
);

export default RepoCard;