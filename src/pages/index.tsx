import React, {useEffect, useState} from "react";
import {NextPage} from 'next';
import { LandingPage, UserHome, FullScreenLoader } from '@components/home';
import {useDispatch, useSelector } from "react-redux";
import {RootState} from "@src/redux/reducers";
import { login } from "@src/redux/actions";


const Home: NextPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const loading = useSelector((state: RootState) => state.auth.loading);
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!user)
            dispatch(login({username: 'sdf', password: 'sdf'}));
    }, [user]);

    useEffect(()=>{
        setMounted(true);
    }, []);

    return (
        mounted ?
            loading? <FullScreenLoader/>
                : !!user ? <UserHome user={user}/>
                : <LandingPage/>
            : <FullScreenLoader/>
    );
};

export default Home;
