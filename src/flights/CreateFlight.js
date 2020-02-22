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

const CreateFlight = ({ userID }) => {
    const [date, setDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [passengers, setPassengers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showCreateModal, setShowModal] = useState(false);
    const [createFlightError, setCreateFlightError] = useState('');

    useEffect(() => {
        getAllUsers().then(setAllUsers);
    }, []);
    const handleSubmit = () => {

    };

    return (
        <div>
            <CreateFlightModal
                flight={ { flight_date: date, origin, destination, passengers } }
                open={ showCreateModal}
                handleClose={ () => setShowModal(false) }
                handleSave={ (flight) => {
                    setShowModal(false);
                    createFlight(flight).catch(() => {
                        setCreateFlightError('Unable to join flight')
                    });
                }}
            />
            { createFlightError }
            <form noValidate autoComplete="off">
                <InputLabel>Datetime</InputLabel>
                <Input
                    defaultValue={ '2020-02-01T17:00:00.00' }
                    onChange={ e => setDate(e.target.value) }
                    value={ date }
                />
                <InputLabel>Origin</InputLabel>
                <Input
                    defaultValue={ 'Plymouth' }
                    onChange={ e => setOrigin(e.target.value) }
                    value={ origin }
                />
                <InputLabel>Destination</InputLabel>
                <Input
                    onChange={ e => setDestination(e.target.value) }
                    value={ destination }
                />
                <InputLabel>Passengers</InputLabel>
                <Select
                    multiple
                    value={ passengers }
                    onChange={ e => setPassengers(e.target.value) }
                    input={<Input />}
                >
                    { allUsers.filter(u => u.id !== userID).map(u => (
                        <MenuItem key={ u.name } value={ u }>
                            { u.name }
                        </MenuItem>
                    ))}
                </Select>
            </form>
            <Button onClick={ () => setShowModal(true) } variant={ 'outlined'  }>Create Flight</Button>
        </div>
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
