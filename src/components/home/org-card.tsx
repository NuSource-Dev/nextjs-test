import React, { FC, MouseEventHandler } from "react";
import {Avatar, Card, Grid, Skeleton, Stack, styled} from "@mui/material";
import { Organization } from "@src/models";

interface Props {
    org: Organization,
    onClick: MouseEventHandler<HTMLDivElement>
}

export const CustomCard = styled(Card)`
  display: flex;
  padding: 15px;
  box-shadow: none;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
  border: 1px solid ${(props) => props.theme.palette.grey.A700};
  background-color: ${(props) => props.theme.palette.background.default};
`;

const OrgCard: FC<Props> = ({ org, onClick }) => {
    return <CustomCard onClick={onClick}>
        <Avatar
            sx={{ width: 60, height: 60 }}
            variant="square"
            src={org.avatar_url}
            alt={org.display_name}
        />
        <Grid container direction="column">
            <Grid item>{org.slug}</Grid>
            <Grid item>{org.display_name}</Grid>
            <Grid item sx={{ fontSize: 13, color: 'text.secondary' }}>{org.description}</Grid>
        </Grid>
    </CustomCard>;
};

export const OrgCardSkeleton: FC = () => (
    <CustomCard>
        <Skeleton
            variant="circular"
            sx={{ width: 60, height: 60 }}
            animation="wave"
        />
        <Stack sx={{width: 'calc(100% - 80px)'}}>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="text" animation="wave"/>
        </Stack>
    </CustomCard>
);

export default OrgCard;