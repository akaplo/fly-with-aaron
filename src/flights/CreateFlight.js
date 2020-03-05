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
    DialogContentText, DialogActions
} from "@material-ui/core";
import {createFlight, getAllUsers } from "../actions/actions";
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

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
    }
}));
const CreateFlight = ({ user }) => {
    const classes = styles();
    const [date, setDate] = useState(new Date());
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [passengers, setPassengers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showCreateModal, setShowModal] = useState(false);
    const [createFlightError, setCreateFlightError] = useState('');
    const flight = { flight_date: date, origin, destination, passengers };
    useEffect(() => {
        getAllUsers().then(setAllUsers);
    }, []);

    return (
        <MuiPickersUtilsProvider utils={ MomentUtils }>
            <div className={ classes.container }>
                <CreateFlightModal
                    flight={ flight }
                    open={ showCreateModal}
                    handleClose={ () => setShowModal(false) }
                    handleSave={ () => {
                        setShowModal(false);
                        createFlight(flight).catch(() => {
                            setCreateFlightError('Unable to join flight')
                        });
                    }}
                />
                { createFlightError }
                <div className={ classes.title }>Manually Add Flight</div>
                <form noValidate autoComplete='off'>
                    <InputLabel className={ classes.topMargin }>Datetime</InputLabel>
                    <KeyboardDateTimePicker
                        variant={ 'inline' }
                        ampm={ true }
                        value={ date }
                        onChange={ date => setDate(date.toDate()) }
                        onError={ console.log }
                        disablePast
                        format={ 'MM/DD/YY ha' }
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
                    <Select
                        className={ classes.input }
                        multiple
                        value={ passengers }
                        onChange={ e => setPassengers(e.target.value) }
                        input={<Input />}
                    >
                        { allUsers.filter(u => u.email !== user.email).map(u => (
                            <MenuItem key={ u.name } value={ u }>
                                { u.name }
                            </MenuItem>
                        ))}
                    </Select>
                </form>
                <Button
                    onClick={ () => setShowModal(true) }
                    variant={ 'outlined' }
                >
                    Create Flight
                </Button>
            </div>
        </MuiPickersUtilsProvider>
    );
};

const CreateFlightModal = ({ open, handleClose, handleSave, flight }) => (
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>{"Create Flight"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                { flight.origin} to { flight.destination }<br/>
                { moment(flight.flight_date).format('dddd, MMMM Do') }<br/>
                With { flight.passengers.map(p => p.name).join(', ') || '\<nobody\>'}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary" autoFocus>
                Create Flight
            </Button>
        </DialogActions>
    </Dialog>
);

export default CreateFlight;
