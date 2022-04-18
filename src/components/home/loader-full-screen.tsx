import React, { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const FullScreenLoading: FC= () => (
    <Backdrop
        open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
        <CircularProgress/>
    </Backdrop>
);

export default FullScreenLoading;
