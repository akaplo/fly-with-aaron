//admin view of all users
// An admin can create flights (until there's an API to pull flights from FSP)

import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions
} from "@material-ui/core";
import {createFlight, getAllUsers } from "../actions/actions";
import moment from 'moment';
import User from "./User";
import UpcomingFlights from "../flights/UpcomingFlights";

const Users = ({ userID }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [showUserModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        getAllUsers().then(setAllUsers);
    }, []);

    return (
        <div>
            <b><i>All Users</i></b>
            <UserViewModal
                user={ selectedUser }
                open={ showUserModal}
                handleClose={ () => setShowModal(false) }
            />
            { allUsers.map(u =>
                <div onClick={ () => {
                    if (!u.admin) {
                        setSelectedUser(u);
                        setShowModal(true);
                    }
                }}>
                    <User user={ u }/>
                    <div>---</div>
                </div>
                )
            }
        </div>
    );
};

const UserViewModal = ({ open, handleClose, user }) => (
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>{ user.name }</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <UpcomingFlights userID={ user.id }/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
);

export default Users;
