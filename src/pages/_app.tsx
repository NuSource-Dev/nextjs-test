import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ConnectedRouter } from "connected-next-router";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { store } from "../redux/store";
import theme from "../utils/theme";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({Component, pageProps}: AppPropsWithLayout) {

    return(
        <Provider store={store}>
            <ConnectedRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;