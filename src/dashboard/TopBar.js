import React, { Fragment, useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { getJoinableFlights, joinFlight } from "../actions/actions";
import { makeStyles } from "@material-ui/core/styles";


const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    name: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }
}));
const TopBar = ({ user }) => {
    const classes = styles();

    return (
        <AppBar position="static">
            <Toolbar variant={ 'dense' } className={ classes.flex }>
                <Typography variant={ 'h5' } className={classes.name}>
                    Fly With Aaron
                </Typography>
                { user.admin &&
                    <Typography variant={ 'h5' } className={classes.name}>
                        Administrator View
                    </Typography>
                }
                <Typography className={classes.name} >
                    { user.name }
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
//
// const ComeFlyingModal = ({ open, handleClose, handleSave, flight }) => (
//     <Dialog
//         open={open}
//         onClose={handleClose}
//     >
//         <DialogTitle>{"Join this flight?"}</DialogTitle>
//         <DialogContent>
//             <DialogContentText>
//                 Confirm that you'd like to join this flight:
//                 { flight.origin} to { flight.destination }<br/>
//                 { moment(flight.flight_date).format('dddd, MMMM Do') }
//             </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//             <Button onClick={handleClose} color="primary">
//                 Nevermind
//             </Button>
//             <Button onClick={handleSave} color="primary" autoFocus>
//                 Join Flight
//             </Button>
//         </DialogActions>
//     </Dialog>
// );

export default TopBar;
