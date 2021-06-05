import { AppBar,createStyles, CssBaseline, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { FC } from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle} from '@material-ui/icons';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            }
        },
        toolbar: {
            paddingRight: 24,
        }
    }));


interface NavBarProps {
    openMenuState: [boolean, (value: boolean) => void]
}
const NavBar: FC<NavBarProps> = ({openMenuState}) => {
    const classes = useStyles();
    const [open, setopen] = openMenuState;

    const handleDrawerOpen = () => {
        setopen(true);
    }
    return (
        <>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        className={classes.menuButton}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" className={classes.title} variant="h6" noWrap color="inherit">
                        Fixenova
                    </Typography>
                    <IconButton
                        arial-label="account of current user"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;