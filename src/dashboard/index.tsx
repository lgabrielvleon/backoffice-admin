import { Backdrop, CircularProgress, makeStyles, Theme } from '@material-ui/core';
import React, {FC} from 'react';
import DrawerLeft from '../components/DrawerLeft';
import Service from '../services/Service';
import NavBar from './../components/NavBar'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    backdrop: {
        zIndex: theme.zIndex.drawer + theme.zIndex.modal + 1,
        color: '#fff',
    },
}))


const Dashboard: FC = () => {
    const classes = useStyles();
    const [open, setopen] = React.useState(false);
    const [loader, setloader] = React.useState(false);

    return(
        <div className={classes.root}>
            <NavBar 
                openMenuState={[open, setopen]}
            />
            <DrawerLeft 
                openState={[open, setopen]}
            />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Service
                    loaderState={setloader}
                />
            </main>

            <Backdrop className={classes.backdrop} open={loader} onClick={() => { setloader(false) }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Dashboard;