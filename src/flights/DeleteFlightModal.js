import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React from "react";
import { deleteFlight } from "../actions/actions";
import moment from 'moment';

export const DeleteFlightModal = ({ flight, handleClose, open, refreshFlights }) => (
    <Dialog
        open={ open }
        onClose={ () => {
            deleteFlight(flight).then(refreshFlights);
            handleClose();
        } }
    >
        <DialogTitle>{ "Delete Flight" }</DialogTitle>
        <DialogContent>
            {
                flight &&
                <span>
                    This flight is { moment(flight.flight_datetime).format('MM/DD/YY, hh:MM:SSa') } with { flight.passengers.map(p => p.name.split(' ')[0]).join(', ') }
                </span>
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleClose } color="primary">
                Cancel
            </Button>
            <Button
                color="primary"
                onClick={ () => {
                    deleteFlight(flight).then(refreshFlights);
                    handleClose();
                } }
            >
                    Delete
            </Button>
        </DialogActions>
    </Dialog>
);
