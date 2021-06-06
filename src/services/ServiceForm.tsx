import React, { FC } from 'react'
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, makeStyles, TextField, Theme } from '@material-ui/core'
import { useFormik } from 'formik';
import { Service } from '../types/Service'

const useStyles = makeStyles((theme: Theme) => (
    {
        margin: {
            margin: theme.spacing(1)
        }
    }
))

interface ServiceFormPros {
    serviceState: [Service, (value: Service) => void],
    onSubmit(values: Service): void,
    openState: [boolean, (value: boolean) => void],
    formAdd: boolean,
}

const ServiceForm: FC<ServiceFormPros> = ({ onSubmit, serviceState, openState, formAdd }) => {
    const classes = useStyles();
    const [open, setopen] = openState;
    const [service, setservice] = serviceState;
    const formik = useFormik({
        initialValues: service,
        onSubmit: (values) => {
            onSubmit(values)
            setservice({ action: '', condition: '', name: '', price: 0, service: '', unit: '' })
            handleClose()
        },

    })

    const handleClose = () => {
        setopen(false);
        setservice({ action: '', condition: '', name: '', price: 0, service: '', unit: '' });
    }

    React.useEffect(() => {
        formik.setFieldValue('name', service.name, false);
        formik.setFieldValue('id', service.id, false);
        formik.setFieldValue('action', service.action, false);
        formik.setFieldValue('condition', service.condition, false);
        formik.setFieldValue('price', service.price, false);
        formik.setFieldValue('service', service.service, false);
        formik.setFieldValue('unit', service.unit, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service])

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{formAdd ? "Nuevo servicio" : "Editar servicio"}</DialogTitle>
            
            <Divider />
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        {formAdd ? "Detalle del nuevo servicio a agregar." : "Detalle del servicio a modificar."}
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="service"
                                name="service"
                                label="Servicio"
                                type="text"
                                fullWidth
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
                                fullWidth
                                className={classes.margin}
                                onChange={formik.handleChange}
                                value={formik.values.action}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="Precio"
                                type="number"
                                fullWidth
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
                                fullWidth
                                className={classes.margin}
                                onChange={formik.handleChange}
                                value={formik.values.unit}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider />
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