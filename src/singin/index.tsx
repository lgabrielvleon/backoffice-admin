import { Avatar, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { FC } from 'react';
import {Auth} from 'aws-amplify';
import {LoginForm, LoginFormValues} from './components/login-form';

const useStyles = makeStyles((theme) => ({
    root:{
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.palette.type==='light' ? theme.palette.grey[50] : theme.palette.grey[900],
    },
    paper:{
        margin: theme.spacing(8,4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));

const SignIn: FC = () => {
    const classes = useStyles();

    const handleSubmit = async (values: LoginFormValues) =>{
        try {
            await Auth.signIn(values.user, values.password);
        } catch (error) {
            if (error.code === 'NotAuthorizedException') {
                alert('La contraseña o correo ingresado no es el correcto.');
            }else{
                alert('Tenemos un problema para ejecutar tu operación.');
            }
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginForm onSubmit={handleSubmit} />
                </div>
            </Grid>

        </Grid>
    );
}

export default SignIn;