import React, { FC } from "react";
import { Avatar, Card, Grid, styled } from "@mui/material";
import { Organization } from "@src/dummy";

interface Props {
    org: Organization
}

const CustomCard = styled(Card)`
  display: flex;
  padding: 15px;
  box-shadow: none;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.palette.grey.A700};
  background-color: ${(props) => props.theme.palette.background.default};
`;

const OrgCard: FC<Props> = ({ org }) => {
    return <CustomCard>
        <Avatar
            sx={{ width: 60, height: 60 }}
            variant="square"
            src={org.avatar_url}
            alt={org.display_name}
        />
        <Grid container direction="column" alignItems="flex-end">
            <Grid item>{org.slug}</Grid>
            <Grid item>{org.display_name}</Grid>
            <Grid item>{org.repo_count}</Grid>
        </Grid>
    </CustomCard>;
};

export default OrgCard;