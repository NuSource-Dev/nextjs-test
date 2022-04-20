import React, { FC } from "react";
import dynamic from "next/dynamic";
import {
    Button,
    Container,
    Divider,
    Link,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRouter} from "next/router";

const AppBar = dynamic(import('@src/layout/appbar'), { ssr: false });

const LandingHeader: FC = () => {
    const router = useRouter();

    return (
        <>
            <AppBar position="sticky" sx={{ background: 'transparent' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ pr: '24px' }}>
                        <Stack direction="row" spacing={2} alignItems="baseline" sx={{ flexGrow: 1 }}>
                            <Typography
                                component="span"
                                variant="h6"
                                noWrap
                            >
                                <Link href="/" sx={{ textDecoration: 'none' }}>NuSource</Link>
                            </Typography>
                            <Button
                                size="small"
                                color="warning"
                                endIcon={<KeyboardArrowDownIcon/>}>
                                Product
                            </Button>
                            <Button size="small" color="warning">Team</Button>
                            <Button size="small" color="warning">Enterprise</Button>
                            <Button
                                size="small"
                                color="warning"
                                endIcon={<KeyboardArrowDownIcon/>}>
                                Explore
                            </Button>
                            <Button size="small" color="warning">Marketplace</Button>
                            <Button
                                size="small"
                                color="warning"
                                endIcon={<KeyboardArrowDownIcon/>}>
                                Price
                            </Button>
                        </Stack>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                        >
                            <Button
                                size="small"
                                color="info"
                                onClick={() => router.push('/login')}
                            >
                                Sign In
                            </Button>
                            <Button size="small" color="info" variant="outlined">Sign Up</Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
};

export default LandingHeader;