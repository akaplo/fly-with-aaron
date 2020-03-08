import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }
});
const User = ({ user }) => {
    const classes = styles();
    return (
        <div className={ classes.root }>
            { user.admin && <span>(Administrator)</span> }
            <span>{ user.name }</span>
            <span>{ user.email }</span>
            { !user.admin && <span>{ user.flights.length } total flights</span> }
            <span>{ user.weight || '?' }lbs</span>
        </div>

    );
};

export default User;
