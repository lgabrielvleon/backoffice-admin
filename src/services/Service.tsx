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

const Service: FC<ServiceProps> = ({loaderState}) => {
    const classes = useStyles();
    const [formOpen, setOpenform] = React.useState(false)
    const handleOpenForm = () => {
        setOpenform(true)
    }
    const initialValuesAddService: ServiceType = { unit: '', action: '', condition: '', name: '', price: 0, service: '' }

    const handleNewCustomer = async (values: ServiceType) => {
            loaderState(true)
            var list: Array<ServiceType> = []
            list.push(values)
            await service.createService(list)
            loaderState(false)
    }
    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ServicesTable />
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpenForm}>
                <Add />
            </Fab>

            <ServiceForm
                initialValues={initialValuesAddService}
                onSubmit={handleNewCustomer}
                openState={[formOpen, setOpenform]}
            />
        </>
    )
}

export default Service;