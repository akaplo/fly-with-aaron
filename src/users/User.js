import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const styles = makeStyles(theme => ({
    root: {
        // border: '1px solid grey',
        // borderRadius: '10px',
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
