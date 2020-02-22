import React, { useEffect, useState } from 'react';
import { Input, Button, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@material-ui/core";
import { getJoinableFlights, joinFlight } from "../actions/actions";
import moment from 'moment';

const JoinFlight = ({ userID }) => {
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
            {
                upcomingFlights.map(f => {
                    const date = moment(f.flight_date);
                    return <div>
                        <div>On <b>{ date.format('dddd, MMMM Do') }</b> at { date.format('h:mm:ss a') }</div>
                        <div>{ f.origin } -> { f.destination }</div>
                        <span>Flight currently has { f.passengers.map(p => p.name).join(',') }</span>
                        { f.passengers.length === 4 && <span>This flight is full!</span> }
                        <Button
                            disabled={ f.passengers.length === 4 }
                            onClick={ () => {
                                setShowModal(true);
                                setFlightToJoin(f);
                            } }
                        >
                            Come flying!
                        </Button>
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
