import React, { Fragment, useState } from 'react';
import Flight from "./Flight";
import { sortFlights } from "../actions/actions";
import { IconButton } from "@material-ui/core";
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
        justifyContent: 'space-between'
    }
});

const AllFlights = ({ flights, refreshFlights, user }) => {
    const classes = styles();
    const [flightToDelete, setFlightToDelete] = useState(undefined);
    const [flightToEdit, setFlightToEdit] = useState(undefined);
    const pastFlights = sortFlights(flights.filter(f => new Date(f.flight_datetime) < new Date()));
    const futureFlights = sortFlights(flights.filter(f => new Date(f.flight_datetime) > new Date()));
    return (
        <div>
            <span>All Past Flights:</span>
            <CreateFlightModalWrapper
                flight={ flightToEdit }
                user={ user }
                open={ !!flightToEdit }
                handleClose={ () => {
                    setFlightToEdit(undefined);
                    refreshFlights();
                } }
            />
            <DeleteFlightModal
                flight={ flightToDelete }
                handleClose={ () => setFlightToDelete(undefined) }
                open={ !!flightToDelete }
                refreshFlights={ refreshFlights }
            />
            { pastFlights
                .map(f =>
                    <Fragment>
                        <Divider/>
                        <div className={ classes.flightContainer }>
                            <Flight flight={f} key={ f.id } showAll={ true }/>
                            <div className={ classes.actions }>
                                <IconButton onClick={ () => setFlightToEdit(f) }><EditIcon/></IconButton>
                                <IconButton onClick={ () => setFlightToDelete(f) }><DeleteIcon/></IconButton>
                            </div>
                        </div>
                    </Fragment>
            ) }
            <hr/>
            <span>All Upcoming Flight(s)</span>
            { futureFlights.filter(f => new Date(f.flight_datetime) > new Date()).map(f =>
                <Fragment>
                    <Divider/>
                    <div className={ classes.flightContainer }>
                        <Flight flight={ f } key={ f.id } showAll={ true }/>
                        <div className={ classes.actions }>
                            <IconButton onClick={ () => setFlightToEdit(f) }><EditIcon/></IconButton>
                            <IconButton onClick={ () => setFlightToDelete(f) }><DeleteIcon/></IconButton>
                        </div>
                    </div>
                </Fragment>
            ) }
        </div>
    );
};

export default AllFlights;
