import React, { FC } from "react";
import {Box, styled} from "@mui/material";

const Container = styled('div')`
 width: 100%;
 height: 100vh;
 background-size: 100% 100%;
`;

const Layout: FC = (props) => {

    const {children} = props;
    return (
        <Container>
            {children}
        </Container>
    )
};

export default Layout;