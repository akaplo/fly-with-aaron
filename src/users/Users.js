//admin view of all users
// An admin can create flights (until there's an API to pull flights from FSP)

import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, List, ListItem
} from "@material-ui/core";
import {addFlightDataToUser, getAllUsers} from "../actions/actions";
import User from "./User";
import UpcomingFlights from "../flights/UpcomingFlights";

const Users = ({ flights }) => {
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
                flights={ flights }
                user={ selectedUser }
                open={ showUserModal}
                handleClose={ () => setShowModal(false) }
            />
            <List>
                { allUsers.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }).map(u =>
                    <ListItem
                        button
                        disabled={ u.admin }
                        onClick={ () => {
                            if (!u.admin) {
                                setSelectedUser(u);
                                setShowModal(true);
                            }
                        }}
                    >
                        <User user={ u }/>
                    </ListItem>
                )}
            </List>
        </div>
    );
};

const UserViewModal = ({ flights, open, handleClose, user }) => (
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>Viewing <b>{ user.name }</b></DialogTitle>
        <DialogContent>
            <DialogContentText>
                <UpcomingFlights user={ addFlightDataToUser(user, flights) }/>
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
