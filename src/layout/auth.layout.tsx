import React, { FC } from 'react';
import { styled } from "@mui/material";

const Container = styled('div')`
 width: 100%;
 height: 100vh;
`;

const AuthLayout: FC = (props) => {
    const {children} = props;
    return (
        <Container>{children}</Container>
    )
};

export default AuthLayout;