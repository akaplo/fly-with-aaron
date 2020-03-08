// An admin can create flights (until there's an API to pull flights from FSP)
import React, { useEffect, useState } from 'react';
import {
    Button,
    Input,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, IconButton, ListItem
} from "@material-ui/core";
import {
    createFlight,
    getAllUsers,
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

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        textSize: 'large',
        fontWeight: 'bold',
        flexDirection: 'column',
        marginLeft: '1rem',
        marginRight: '1rem'
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
        width: '30rem'
    },
    queuedForDeletion: {
        color: 'grey',
        textDecoration: 'line-through'
    }
}));
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
                    open={ showCreateModal}
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
                                    removedPax.forEach(p => removeFlightFromUser({ email: p }, flight));
                                    addedPax.forEach(p => addFlightToUser({ email: p }, flight));
                                });
                        } else {
                            createFlight({
                                ...f,
                                passengers: f.passengers.map(p => ({ email: p.email, name: p.name }))
                            })
                                .then((res) => allUsers.filter(u => res.data.flight.passengers.map(p => p.email).includes(u.email)).forEach(p => addFlightToUser(p, res.data.flight)))
                                .catch((e) => {
                                console.error(e);
                                setCreateFlightError('Unable to create flight')
                            });
                        }
                    }}
                />
                { createFlightError }
                <form noValidate autoComplete='off'>
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
                    <Input
                        className={ classes.input }
                        defaultValue={ 'Plymouth' }
                        onChange={ e => setOrigin(e.target.value) }
                        value={ origin }
                    />
                    <InputLabel className={ classes.topMargin }>Destination</InputLabel>
                    <Input
                        className={ classes.input }
                        onChange={ e => setDestination(e.target.value) }
                        value={ destination }
                    />
                    <InputLabel className={ classes.topMargin }>Passengers</InputLabel>
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
                    { (!flight || (flight && flight.passengers && flight.passengers.length === 0)) && <Select
                        className={classes.input}
                        multiple
                        value={passengers}
                        onChange={e => setPassengers(e.target.value)}
                        input={<Input/>}
                    >
                        {allUsers.filter(u => u.email !== user.email).map(u => (
                            <MenuItem key={u.name} value={u}>
                                {u.name}
                            </MenuItem>
                        ))}
                    </Select>
                    }
                </form>
                <Button
                    disabled={ flight && origin === flight.origin && destination === flight.destination && date === flight.flight_datetime && arraysAreEqual(passengers.map(p => p.email), flight.passengers.map(p => p.email)) }
                    onClick={ () => setShowModal(true) }
                    variant={ 'outlined' }
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