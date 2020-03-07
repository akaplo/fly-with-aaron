import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontStyle: props => props.admin ? 'italic' : 'normal',
        color: props => props.admin ? 'grey' : 'black'
    }
});
const User = ({ user }) => {
    console.log(user.admin)
    const classes = styles({admin: user.admin });
    return (
        <div className={ classes.root }>
            { user.admin && <span>(Administrator)</span> }
            <span>{ user.name }</span>
            <span>{ user.email }</span>
            <span>{ user.flights.length } total flights</span>
            <span>{ user.weight || '?' }lbs</span>
        </div>

    );
};

export default User;
