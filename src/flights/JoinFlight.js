import React, { Fragment, useEffect, useState } from 'react';
import { Input, Button, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Tooltip } from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { getJoinableFlights, joinFlight } from "../actions/actions";
import moment from 'moment';
import Flight from "./Flight";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    flightContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 1rem 2rem 1rem'
    },
    join: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    soonWarning: {
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
const JoinFlight = ({ user }) => {
    const classes = styles();
    const [upcomingFlights, setFlights] = useState([]);
    const [timeWindow, setTimeWindow] = useState('1 month');
    const [flightToJoin, setFlightToJoin] = useState({});
    const [showComeFlyingModal, setShowModal] = useState(false);
    const [joinFlightError, setJoinFlightError] = useState('');

    useEffect(() => {
        getJoinableFlights(user).then(flights => {
            setFlights(flights);
        });
    }, []);
    return (
        <div className={ classes.container }>
            <ComeFlyingModal
                flight={ flightToJoin }
                open={ showComeFlyingModal}
                handleClose={ () => setShowModal(false) }
                handleSave={ () => {
                    setShowModal(false);
                    joinFlight(user, flightToJoin.id).then(() => {
                        setFlightToJoin({});
                        getJoinableFlights(user);
                    }).catch(() => {
                        setJoinFlightError('Unable to join flight')
                    });
                }}
            />
            { joinFlightError }
            <span className={ classes.headerText}>
                Flights To Join:
            </span>
            {
                upcomingFlights.map(f => {
                    const daysUntilFlight = (new Date(f.flight_date) - new Date())/1000/60/60/24;
                    const isFull = f.passengers.length === 4;
                    return <div className={classes.flightContainer}>
                        <div className={ classes.left }>
                            <Flight flight={f}/>
                        </div>
                        {
                            daysUntilFlight < 3 && !isFull &&
                            <div className={ classes.soonWarning }><Alert severity="warning">We need { 4 - f.passengers.length } more!</Alert></div>
                        }
                        {
                            daysUntilFlight <= 5 && daysUntilFlight > 3 && !isFull &&
                            <div className={ classes.soonWarning }><Alert severity="info">Happening real soon, join us!</Alert></div>
                        }
                        {
                            f.passengers.length < 3 && daysUntilFlight > 5 && daysUntilFlight < 10 &&
                            <div className={ classes.soonWarning }><Alert severity="info">Needs more people!</Alert></div>
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
                })
            }
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
                Confirm that you'd like to join this flight:
                { flight.origin} to { flight.destination }<br/>
                { moment(flight.flight_date).format('dddd, MMMM Do') }
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

export default JoinFlight;
