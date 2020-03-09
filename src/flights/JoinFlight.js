import React, { Fragment, useState } from 'react';
import { Button, Dialog, Divider, DialogTitle, DialogContentText, DialogActions, DialogContent, Paper, Tooltip } from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { getJoinableFlights, joinFlight } from "../actions/actions";
import moment from 'moment';
import Flight from "./Flight";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    flightContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem'
    },
    join: {
        display: 'flex',
        alignItems: 'center'
    },
    soonWarning: {
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'italic',
        color: '#ff7300'
    },
    left: {
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        marginTop: '2rem'
    },
    headerText: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
        fontWeight: 'bold',
        fontSize: 'large',
        marginLeft: '0.5rem'
    }
});
const JoinFlight = ({ flights, refreshUser, user }) => {
    const classes = styles();
    const upcomingFlights = getJoinableFlights(user.flights || [], flights)
        .sort((a, b) => {
            if (a.flight_datetime < b.flight_datetime) return -1;
            if (a.flight_datetime > b.flight_datetime) return 1;
            return 0;
        });
    const [flightToJoin, setFlightToJoin] = useState({});
    const [showComeFlyingModal, setShowModal] = useState(false);
    const [joinFlightError, setJoinFlightError] = useState('');

    return (
        <div className={ classes.container }>
            <ComeFlyingModal
                flight={ flightToJoin }
                open={ showComeFlyingModal}
                handleClose={ () => setShowModal(false) }
                handleSave={ () => {
                    setShowModal(false);
                    joinFlight(user, flightToJoin).then(() => {
                        setFlightToJoin({});
                        refreshUser(user.email);
                    }).catch((e) => {
                        setJoinFlightError('Unable to join flight ' + e)
                    });
                }}
            />
            { joinFlightError }
            <span className={ classes.headerText}>
                Flights To Join:
            </span>
            <Paper elevation={ 1 }>
                {
                    upcomingFlights.map(f => {
                        const daysUntilFlight = (new Date(f.flight_datetime) - new Date())/1000/60/60/24;
                        const isFull = f.passengers.length === 4;
                        return (
                            <Fragment>
                                <div className={classes.flightContainer} key={ f.id }>
                                    <div className={ classes.left }>
                                        <Flight flight={ f } user={ user }/>
                                    </div>
                                    {
                                        daysUntilFlight < 3 && !isFull &&
                                        <div className={ classes.soonWarning }><Alert severity="error">HELP! We need { 4 - f.passengers.length } more!</Alert></div>
                                    }
                                    {
                                        daysUntilFlight <= 5 && daysUntilFlight > 3 && !isFull &&
                                        <div className={ classes.soonWarning }><Alert severity="warning">Happening really soon, join us!</Alert></div>
                                    }
                                    {
                                        f.passengers.length < 3 && daysUntilFlight > 5 && daysUntilFlight < 10 &&
                                        <div className={ classes.soonWarning }><Alert severity="info">
                                            This { moment(f.flight_datetime).format('dddd') }! Need more people!
                                        </Alert></div>
                                    }
                                    <div className={classes.join}>
                                        <Tooltip title={ isFull ? 'Flight is full' : '' } arrow>
                                <span>
                                    <Button
                                        color={ 'primary' }
                                        disabled={ isFull }
                                        onClick={() => {
                                            setShowModal(true);
                                            setFlightToJoin(f);
                                        }}
                                        variant={ 'contained' }
                                    >
                                    Come flying!
                                </Button>
                                </span>
                                        </Tooltip>
                                    </div>
                                </div>
                                <Divider/>
                            </Fragment>
                        )
                    })
                }
            </Paper>
        </div>
    );
};

const ComeFlyingModal = ({ open, handleClose, handleSave, flight }) => (
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>{"Join this flight?"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <p>{ moment(flight.flight_datetime).format('dddd, MMMM Do hh:mma') }</p>
                { flight.origin || 'TBD' } to { flight.destination || 'TBD' }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Nevermind
            </Button>
            <Button onClick={handleSave} color="primary" autoFocus>
                Join Flight
            </Button>
        </DialogActions>
    </Dialog>
);

JoinFlight.defaultProps = {
    flights: [],
    user: {
        flights: []
    }
};

export default JoinFlight;
