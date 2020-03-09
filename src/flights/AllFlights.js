import React, { Fragment, useState } from 'react';
import Flight from "./Flight";
import { sortFlights } from "../actions/actions";
import {IconButton, Paper} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";
import { CreateFlightModalWrapper } from "./CreateFlight";
import {DeleteFlightModal} from "./DeleteFlightModal";
const styles = makeStyles({
    actions: {
        display: 'flex',
        alignItems: 'center'
    },
    flightContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1rem 0'
    },
    flightsPaper: {
        padding: '1rem'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        fontSize: 'large',
        marginLeft: '0.5rem'
    }
});

const AllFlights = ({ allUsers, flights, refreshFlights, refreshUsers, user }) => {
    const classes = styles();
    const [flightToDelete, setFlightToDelete] = useState(undefined);
    const [flightToEdit, setFlightToEdit] = useState(undefined);
    const pastFlights = sortFlights(flights.filter(f => new Date(f.flight_datetime) < new Date()));
    const futureFlights = sortFlights(flights.filter(f => new Date(f.flight_datetime) > new Date()));
    return (
        <Fragment>
            <CreateFlightModalWrapper
                allUsers={ allUsers }
                flight={ flightToEdit }
                user={ user }
                open={ !!flightToEdit }
                handleClose={ () => {
                    setFlightToEdit(undefined);
                    refreshFlights();
                    refreshUsers();
                } }
            />
            <DeleteFlightModal
                flight={ flightToDelete }
                handleClose={ () => setFlightToDelete(undefined) }
                open={ !!flightToDelete }
                refreshFlights={ refreshFlights }
            />
            <h2 className={ classes.header }>All Upcoming Flights</h2>
            <Paper className={ classes.flightsPaper }>
                { futureFlights.filter(f => new Date(f.flight_datetime) > new Date()).map(f =>
                    <Fragment>
                        <div className={ classes.flightContainer }>
                            <Flight flight={ f } key={ f.id } showAll user={ user }/>
                            <div className={ classes.actions }>
                                <IconButton onClick={ () => setFlightToEdit(f) }><EditIcon/></IconButton>
                                <IconButton onClick={ () => setFlightToDelete(f) }><DeleteIcon/></IconButton>
                            </div>
                        </div>
                        <Divider/>
                    </Fragment>
                ) }
            </Paper>
            <h2 className={ classes.header }>All Past Flights:</h2>
            <Paper className={ classes.flightsPaper }>
                { pastFlights
                    .map(f =>
                        <Fragment>
                            <div className={ classes.flightContainer }>
                                <Flight flight={f} key={ f.id } showAll user={ user }/>
                                <div className={ classes.actions }>
                                    <IconButton onClick={ () => setFlightToEdit(f) }><EditIcon/></IconButton>
                                    <IconButton onClick={ () => setFlightToDelete(f) }><DeleteIcon/></IconButton>
                                </div>
                            </div>
                            <Divider/>
                        </Fragment>
                ) }
            </Paper>
        </Fragment>
    );
};

export default AllFlights;
