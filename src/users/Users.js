//admin view of all users
// An admin can create flights (until there's an API to pull flights from FSP)

import React, { Fragment, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, Divider, List, ListItem
} from "@material-ui/core";
import User from "./User";
import UpcomingFlights from "../flights/UpcomingFlights";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles(() => ({
    headerRow: {
        display: 'flex',
        width: '100%',
        fontWeight: 'bold'
    },
    headerItem: {
        width: '25%'
    }
}));
const Users = ({ allUsers, flights }) => {
    const [showUserModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const classes = styles();
    return (
        <Fragment>
            <UserViewModal
                flights={ flights }
                user={ selectedUser }
                open={ showUserModal}
                handleClose={ () => setShowModal(false) }
            />
            <List>
                <ListItem>
                    <div className={ classes.headerRow }>
                        <span className={ classes.headerItem }>Name</span>
                        <span className={ classes.headerItem }>Email</span>
                        <span className={ classes.headerItem }>Flight Count</span>
                        <span className={ classes.headerItem }>Weight</span>

                    </div>
                </ListItem>

                { allUsers.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }).map(u =>
                    <Fragment>
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
                        <Divider/>
                    </Fragment>
                )}
            </List>
        </Fragment>
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
                <UpcomingFlights flights={ flights } user={ user }/>
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
