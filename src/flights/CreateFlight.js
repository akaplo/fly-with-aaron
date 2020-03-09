// An admin can create flights (until there's an API to pull flights from FSP)
import React, { useEffect, useState} from 'react';
import {
    Button,
    TextField,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, IconButton, ListItem,
} from "@material-ui/core";
import {
    createFlight,
    editFlight,
    arraysAreEqual,
    addFlightToUser,
    removeFlightFromUser
} from "../actions/actions";
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {UserCheckboxes} from "../users/Users";

const styles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        textSize: 'large',
        fontWeight: 'bold',
        flexDirection: 'column',
        padding: '1rem'
    },
    title: {
        textSize: 'large',
        fontWeight: 'bold',
        flexDirection: 'column',
    },
    topMargin: {
        marginTop: '1rem',
    },
    input: {
        backgroundColor: 'white'
    },
    queuedForDeletion: {
        color: 'grey',
        textDecoration: 'line-through'
    },
    form: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },
    checkboxesContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 3rem'
    }
});

const CreateFlight = ({ allUsers, flight, user }) => {
    const classes = styles();
    const [date, setDate] = useState(new Date());
    const [origin, setOrigin] = useState('Plymouth');
    const [destination, setDestination] = useState(undefined);
    const [passengers, setPassengers] = useState([]);
    const [showCreateModal, setShowModal] = useState(false);
    const [createFlightError, setCreateFlightError] = useState('');
    useEffect(() => {
        if (flight) {
            setDate(flight.flight_datetime);
            setOrigin(flight.origin);
            setDestination(flight.destination);
            setPassengers(flight.passengers);
        }
    }, [flight]);
    return (
        <MuiPickersUtilsProvider utils={ MomentUtils }>
            <div className={ classes.container }>
                <ConfirmationModal
                    flight={ { flight_datetime: date, origin, destination, passengers } }
                    open={ showCreateModal }
                    handleClose={ () => setShowModal(false) }
                    handleSave={ () => {
                        setShowModal(false);
                        const f = { flight_datetime: date, origin, destination, passengers };
                        if (flight) {
                            const ogPax = allUsers.filter(u => flight.passengers.map(p => p.email).includes(u.email));
                            const newPax = allUsers.filter(u => f.passengers.map(p => p.email).includes(u.email));
                            // Removed passengers are those who are in OGPax but not in newPax
                            const removedPax = ogPax.filter(p => !newPax.includes(p));
                            // Added passengers are those that were NOT in ogPax but are in newPax
                            const addedPax = newPax.filter(p => !ogPax.includes(p));
                            editFlight({
                                ...f,
                                cost: flight.cost,
                                passengers: f.passengers.map(p => ({ email: p.email, name: p.name }))
                            }, flight.id)
                                .then(() => {
                                    console.log(removedPax, addedPax);
                                    removedPax.forEach(p => removeFlightFromUser(p, flight));
                                    addedPax.forEach(p => addFlightToUser(p, flight));
                                });
                        } else {
                            createFlight({
                                ...f,
                                passengers: f.passengers.map(p => ({ email: p.email, name: p.name }))
                            })
                                .then((res) => {
                                    // Add this flight to each appropriate user's profile
                                    allUsers.filter(u => res.data.flight.passengers.map(p => p.email).includes(u.email))
                                        .forEach(p => addFlightToUser(p, res.data.flight));
                                    // Then clear out all this junk
                                    setPassengers([]);
                                    setOrigin('Plymouth');
                                    setDestination(undefined);
                                })
                                .catch((e) => {
                                console.error(e);
                                setCreateFlightError('Unable to create flight')
                            });
                        }
                    }}
                />
                { createFlightError }
                <form className={ classes.form } noValidate autoComplete='off'>
                    <InputLabel className={ classes.topMargin }>Datetime</InputLabel>
                    <KeyboardDateTimePicker
                        variant={ 'inline' }
                        ampm={ true }
                        value={ date }
                        onChange={ date => setDate(date.toDate()) }
                        onError={ console.log }
                        disablePast={ !flight}
                        format={ 'MM/DD/YY hh:mm a' }
                    />
                    <InputLabel className={ classes.topMargin }>Origin</InputLabel>
                    <TextField                        className={ classes.input }
                        defaultValue={ 'Plymouth' }
                        onChange={ e => setOrigin(e.target.value) }
                        value={ origin }
                        variant={ 'outlined' }
                    />
                    <InputLabel className={ classes.topMargin }>Destination</InputLabel>
                    <TextField                        className={ classes.input }
                        onChange={ e => setDestination(e.target.value) }
                        value={ destination }
                        variant={ 'outlined' }
                    />
                    <InputLabel className={ classes.topMargin }>Passengers</InputLabel>
                    <div className={ classes.checkboxesContainer }>
                        <UserCheckboxes onCheckedCallback={ setPassengers } selectedUsers={ passengers } users={ allUsers.filter(u => u.email !== user.email) }/>
                    </div>
                    {
                        !!flight && flight.passengers && flight.passengers.length > 0 && flight.passengers.map(p =>
                            <ListItem>
                                <IconButton onClick={ () => setPassengers(flight.passengers.filter(fp => fp.email !== p.email)) }><RemoveCircleIcon/></IconButton>
                                <span
                                    className={ !passengers.map(p => p.email).includes(p.email) && classes.queuedForDeletion }
                                >
                                    { p.name }
                                </span>
                            </ListItem>
                        )
                    }
                </form>
                <Button
                    className={ classes.topMargin }
                    color={ 'primary' }
                    disabled={ flight && origin === flight.origin && destination === flight.destination && date === flight.flight_datetime && arraysAreEqual(passengers.map(p => p.email), flight.passengers.map(p => p.email)) }
                    onClick={ () => setShowModal(true) }
                    variant={ 'contained' }
                >
                    { flight ? 'Edit' : 'Create' } Flight
                </Button>
            </div>
        </MuiPickersUtilsProvider>
    );
};

const ConfirmationModal = ({ open, handleClose, handleSave, flight }) => (
    <Dialog
        open={ open }
        onClose={ handleClose }
    >
        <DialogTitle>{"Create Flight"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                { flight.origin} to { flight.destination }<br/>
                { moment(flight.flight_datetime).format('dddd, MMMM Do') }<br/>
                With { flight.passengers.map(p => p.name).join(', ') || '<nobody>'}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary" autoFocus>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
);

export const CreateFlightModalWrapper = ({ allUsers, flight, handleClose, user, open }) => (
    <Dialog
        open={ open }
        onClose={ handleClose }
    >
        <DialogTitle>{"Edit Flight"}</DialogTitle>
        <DialogContent>
            <CreateFlight allUsers={ allUsers } flight={ flight } user={ user }/>
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleClose } color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
);

export default CreateFlight;