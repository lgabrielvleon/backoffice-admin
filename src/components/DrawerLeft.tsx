import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import { Build, ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import React, { FC } from 'react'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }
}))

interface DrawerLeftProps {
    openState: [boolean, (value: boolean) => void];
}

const DrawerLeft: FC<DrawerLeftProps> = ({openState}) => {
    const classes = useStyles();

    const [open, setopen] = openState;

    const handleDrawerClose = () => {
        setopen(false);
    }
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <ListItem button>
                        <ListItemIcon>
                            <Build />
                        </ListItemIcon>
                        <ListItemText primary="Servicios" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
    )
}

export default DrawerLeft;