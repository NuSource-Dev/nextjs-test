import React, { FC } from "react";
import { Box } from "@mui/material";


const Layout: FC = (props) => {

    const {children} = props;
    return (
        <Box>
            {children}
        </Box>
    )
};

export default Layout;