import React, { FC } from "react";
import { Box, Container } from "@mui/material";

const Content: FC = (props) => {

    const {children} = props;
    return (
        <Box sx={{ pt: 2}}>
            <Container maxWidth="xl">
                {children}
            </Container>
        </Box>
    )
};

export default Content;