import { Backdrop, CircularProgress, createStyles, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Theme, Typography, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React, { FC, useEffect } from 'react';
import { service } from '../api/Service';
import { Service, ServiceListResponse } from '../types/Service';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))

interface ServiceTableProps {
    onEditService: (serice: Service) => void;
    onDeleteService: (id: string) => void;
    serviceListState: [boolean, (value: boolean) => void];
}

const ServicesTable: FC<ServiceTableProps> = ({ onEditService, onDeleteService, serviceListState }) => {
    const classes = useStyles();
    const [services, setservices] = React.useState<ServiceListResponse[]>([]);
    const [serviceListUpdate, setserviceListUpdate] = serviceListState;
    const [page, setpage] = React.useState(0);
    const [rowsPerPage, setrowsPerPage] = React.useState(20);
    const [loader, setloader] = React.useState(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setpage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setrowsPerPage(+event.target.value);
        setpage(0);
    }

    useEffect(() => {
        const getServices = async () => {
            await service.getServices().then(data => setservices(data));
        }
        if (serviceListUpdate) {
            setloader(true)
            getServices()
            setserviceListUpdate(false)
            setloader(false)
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceListUpdate])


    return (
        <>
            <Paper className={classes.paper}>
                <Typography component="h2" variant="h4" color="primary" gutterBottom>
                    Services
                </Typography>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell>Unit</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service) => {
                                return (
                                    <TableRow hover key={service.id}>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>{service.price}</TableCell>
                                        <TableCell>{service.unit}</TableCell>
                                        <TableCell align="center">
                                            <IconButton><Edit onClick={() => onEditService(service)} /></IconButton>
                                            <IconButton><Delete onClick={() => onDeleteService(service.id)} /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={services.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <Backdrop className={classes.backdrop} open={loader} onClick={() => { setloader(false) }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default ServicesTable;