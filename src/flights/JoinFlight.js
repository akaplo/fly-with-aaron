import React, { Fragment, useEffect, useState } from 'react';
import { Input, Button, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Tooltip } from "@material-ui/core";
import { getJoinableFlights, joinFlight } from "../actions/actions";
import moment from 'moment';
import Flight from "./Flight";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    flightContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem'
    },
    join: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    }
});
const JoinFlight = ({ userID }) => {
    const classes = styles();
    const [upcomingFlights, setFlights] = useState([]);
    const [timeWindow, setTimeWindow] = useState('1 month');
    const [flightToJoin, setFlightToJoin] = useState({});
    const [showComeFlyingModal, setShowModal] = useState(false);
    const [joinFlightError, setJoinFlightError] = useState('');
    useEffect(() => {
        getJoinableFlights(userID).then(flights => {
            setFlights(flights);
        });
    }, []);
    return (
        <div>
            <ComeFlyingModal
                flight={ flightToJoin }
                open={ showComeFlyingModal}
                handleClose={ () => setShowModal(false) }
                handleSave={ () => {
                    setShowModal(false);
                    joinFlight(userID, flightToJoin.id).then(() => {
                        setFlightToJoin({});
                        getJoinableFlights(userID);
                    }).catch(() => {
                        setJoinFlightError('Unable to join flight')
                    });
                }}
            />
            { joinFlightError }
            <span>There are { upcomingFlights.length } upcoming flights in the next { timeWindow } that you aren't already on</span>
            <br/><br/>
            {
                upcomingFlights.map(f =>
                    <div className={ classes.flightContainer }>
                        <Flight flight={ f }/>
                        <div className={ classes.join }>
                            <Tooltip title={ f.passengers.length === 4 ? 'Flight is full' : '' } arrow>
                            <span>
                                <Button
                                    disabled={ f.passengers.length === 4 }
                                    onClick={ () => {
                                        setShowModal(true);
                                        setFlightToJoin(f);
                                    } }
                                >
                                Come flying!
                            </Button>
                            </span>
                            </Tooltip>
                        </div>
                    </div>
                )
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
