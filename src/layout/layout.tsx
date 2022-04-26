import React, {FC, ReactNode, useEffect} from 'react';
import { styled } from "@mui/material";
import {loadUser} from "@src/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/redux/reducers";
import {Cookie} from "@src/models";

const LandingContainer = styled('div')`
 width: 100%;
 height: 100vh;
`;

interface Props {
    children?: ReactNode
    cookie?: Cookie
}

const Layout: FC<Props> = ({children, cookie}) => {

    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (cookie && !userState.user)
            dispatch(loadUser(cookie.vcs));
    }, [dispatch]);

    return (
        <LandingContainer>{children}</LandingContainer>
    )
};

export default Layout;