import React, { FC } from 'react'
import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, Theme } from '@material-ui/core'
import { useFormik } from 'formik';
import { Service } from '../types/Service'

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        margin: {
            margin: theme.spacing(1)
        }
    })
))

interface ServiceFormPros {
    initialValues: Service,
    onSubmit(values: Service): void,
    openState: [boolean, (value: boolean) => void]
}

const ServiceForm: FC<ServiceFormPros> = ({ onSubmit, initialValues, openState}) => {
    const classes = useStyles();
    const [open, setopen] = openState
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            onSubmit(values)
            handleClose()
        }
    })

    const handleClose = () => {
        setopen(false)
    }

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="form-dialog-title">Nuevo Servicio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Detalle del nuevo servicio a agregar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="service"
                        name="service"
                        label="Servicio"
                        type="text"
                        className={classes.margin}
                        onChange={formik.handleChange}
                        value={formik.values.service}
                    />
                    <TextField
                        margin="dense"
                        id="action"
                        name="action"
                        label="Acción"
                        type="text"
                        className={classes.margin}
                        onChange={formik.handleChange}
                        value={formik.values.action}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nombre del servicio"
                        type="text"
                        fullWidth
                        className={classes.margin}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <TextField
                        margin="dense"
                        id="condition"
                        name="condition"
                        label="Condiciones"
                        type="text"
                        fullWidth
                        className={classes.margin}
                        onChange={formik.handleChange}
                        value={formik.values.condition}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name="price"
                        label="Precio"
                        type="number"
                        className={classes.margin}
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <TextField
                        margin="dense"
                        id="unit"
                        name="unit"
                        label="Unidad de medida"
                        type="text"
                        className={classes.margin}
                        onChange={formik.handleChange}
                        value={formik.values.unit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ServiceForm;