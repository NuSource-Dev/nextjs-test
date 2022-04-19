import React, {FC, useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import {
    Avatar,
    ClickAwayListener,
    Container,
    Divider,
    Grow,
    IconButton,
    Link,
    MenuItem,
    MenuList,
    Paper,
    Popper, Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {useRouter} from "next/router";

const AppBar = dynamic(import('@src/layout/appbar'), { ssr: false });

interface Props {
    user: any
}

const Header: FC<Props> = ({ user }) => {
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

    const logout = () => {
        fetch(`/api/user/logout`)
            .then(res => {
                router.replace('/login')
            })
            .catch(e=> console.log(e));
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
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar sx={{ pr: '24px' }}>
                        <Stack
                            direction="row"
                            spacing={4}
                            alignItems="baseline"
                            sx={{ flexGrow: 1 }}
                        >
                            <Typography
                                component="span"
                                variant="h6"
                            >
                                <Link
                                    href="/"
                                    sx={{ textDecoration: 'none', color: '#fff' }}
                                >
                                    NuSource
                                </Link>
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                        >
                            <IconButton
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined }
                                arai-expanded={open ? 'true' : undefined }
                                onClick={handleToggle}
                                color="inherit"
                            >
                                <Avatar
                                    src={user.avatar_url}
                                    alt={user.name}
                                />
                            </IconButton>
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
                                    <MenuItem>
                                        Signed in as {user.name} ({user.vcs_slug})
                                    </MenuItem>
                                    <MenuItem onClick={logout}>Sign out</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
};

export default Header;