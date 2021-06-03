import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { FC } from "react";
import Copyright from "../../components/Copyright";
import { UserLogin } from "../../types/User";

const useStyles = makeStyles((theme) => ({
    form:{
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit:{
        margin: theme.spacing(3,0,2),
    }
}));

export type LoginFormValues = UserLogin

interface LoginFormProps {
    onSubmit(values: LoginFormValues): void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
    const classes = useStyles();

    const initialValues: UserLogin = { user: '',password:'' }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values: LoginFormValues) =>{
            onSubmit(values)
        }
    });

    return (
        <>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="user"
                    label="Email Address"
                    name="user"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    value={formik.values.user}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                        </Button>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </form>
        </>
    )
}

export default LoginForm;