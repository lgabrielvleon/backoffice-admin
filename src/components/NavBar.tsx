import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { FC } from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
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
        }

    }));

const NavBar: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
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
        </div>
    )
}

export default NavBar;