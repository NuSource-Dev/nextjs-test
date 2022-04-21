import React, { FC } from 'react';
import { styled } from "@mui/material";

const LandingContainer = styled('div')`
 width: 100%;
 height: 100vh;
`;

const Layout: FC = (props) => {
    const {children} = props;
    return (
        <LandingContainer>{children}</LandingContainer>
    )
};

export default Layout;