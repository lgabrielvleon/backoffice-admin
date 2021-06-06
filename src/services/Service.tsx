import { Box, Container, Fab, Grid, makeStyles, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FC } from 'react'
import { service } from '../api/Service';
import Copyright from '../components/Copyright';
import { Service as ServiceType } from '../types/Service';
import ServiceForm from './ServiceForm';
import ServicesTable from './ServicesTable';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
}))

interface ServiceProps {
    loaderState: (value: boolean) => void;
}

const Service: FC<ServiceProps> = ({ loaderState }) => {
    const classes = useStyles();
    const [formOpen, setOpenform] = React.useState(false)
    const [serviceListUpdate, setserviceListUpdate] = React.useState(false);
    const [formAdd, setformAdd] = React.useState(false)
    const [objService, setobjService] = React.useState({ unit: '', action: '', condition: '', name: '', price: 0, service: '' })

    const onSubmitForm = async (service: ServiceType) => {
        if (formAdd) {
            await onSubmitAdd(service);
        } else {
            await onSubmitEdit(service);
        }
    }

    const onSubmitAdd = async (values: ServiceType) => {
        loaderState(true)
        var list: Array<ServiceType> = [];
        list.push(values);
        await service.createService(list);
        setserviceListUpdate(true);
        loaderState(false);
    }

    const onSubmitEdit = async (values: ServiceType) => {
        loaderState(true);
        await service.updateService(values);
        setserviceListUpdate(true);
        loaderState(false);
    }

    const onSubmitDelete = async (id: string) => {
        loaderState(true);
        console.info(id);
        await service.deleteService(id);
        setserviceListUpdate(true);
        loaderState(false);
    }

    const handleEditService = (service: ServiceType) => {
        setobjService(service);
        setOpenform(true);
        setformAdd(false);
    }

    const handleAddService = () => {
        setOpenform(true);
        setformAdd(true);
    }


    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ServicesTable
                            onEditService={handleEditService}
                            onDeleteService={onSubmitDelete}
                            serviceListState={[serviceListUpdate, setserviceListUpdate]}
                        />
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleAddService}>
                <Add />
            </Fab>

            <ServiceForm
                formAdd={formAdd}
                serviceState={[objService, setobjService]}
                onSubmit={onSubmitForm}
                openState={[formOpen, setOpenform]}
            />

        </>
    )
}

export default Service;