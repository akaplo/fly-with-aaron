import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }
}));
const User = ({ user }) => {
    const classes = styles();
    return (
        <div className={ classes.root }>
            <span>{ user.name }</span>
            <span>{ user.email }</span>
            <span>{ user.phone }</span>
            <span>{ user.weight }lbs</span>
        </div>

    );
};

export default User;
