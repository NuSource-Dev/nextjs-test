import React, {FC, ReactNode, useEffect} from "react";
import {useRouter} from "next/router";
import {styled} from "@mui/material";
import FullScreenLoading from "@components/home/loader-full-screen";

const Container = styled('div')`
 width: 100%;
 height: 100vh;
`;

interface Props {
    user: any,
    children?: ReactNode
}

const Layout: FC<Props> = ({ user, children}) => {
    const router = useRouter();

    useEffect(()=>{
        if (!user) {
            router.replace('/login');
        }
    }, []);

    return (
            user?
                <Container>
                    {children}
                    </Container>
                :<FullScreenLoading/>
    )
};

export default Layout;