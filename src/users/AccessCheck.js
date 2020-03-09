import React, { useState } from 'react';
import { Typography } from "@material-ui/core";
import { confirmUser } from "../actions/actions";
import { Redirect } from 'react-router-dom';
import { ConfirmCode } from "../login/Login";
import TopBar from "../dashboard/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

const styles = makeStyles({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
const AccessCheck = ({ refreshUser, user }) => {
    const classes = styles();
    const [userConfirmed, setConfirmed] = useState(undefined);
    if (!user) {
        return <Redirect to={ '/' }/>;
    }
    if (userConfirmed === true) {
        return <Redirect to={ '/' }/>;
    }

    const afterConfirm = (confirmed) => {
        if (confirmed === true) {
            refreshUser(user.email).then(() => setConfirmed(true));
        } else {
            setConfirmed(false);
        }
    };
    return (
        <div className={ classes.container }>
            <TopBar user={ user }/>
            { userConfirmed === false && <Alert severity="error">Wrong code :(</Alert> }
            <Typography>
                <p>
                    Hey { user && user.name && user.name.includes(' ') ? user.name.split(' ')[0] : user.name }!
                    One last step: enter the personal access code I gave you.
                </p>
                <p>I can't wait to go flying with you!</p>
            </Typography>
            <ConfirmCode confirm={ (code) => confirmUser(user, code) } onConfirm={ afterConfirm }/>
        </div>
    )
};

export default AccessCheck;