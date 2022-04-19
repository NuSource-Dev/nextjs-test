import React, { FC, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
    Button,
    ClickAwayListener,
    Container,
    Divider,
    Grow,
    Link,
    MenuItem,
    MenuList,
    Paper,
    Popper, Stack,
    Toolbar,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRouter} from "next/router";

const AppBar = dynamic(import('@src/layout/appbar'), { ssr: false });

const LandingHeader: FC = (props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

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
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>Signed in as rarkins (github)</MenuItem>
                                    <MenuItem onClick={handleClose}>Sign out</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
};

export default LandingHeader;