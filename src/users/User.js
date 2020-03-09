import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    headerItem: {
        width: '25%'
    }
});
const User = ({ user }) => {
    const classes = styles();
    return (
        <div className={ classes.root }>
            <span className={ classes.headerItem }>{ user.name } { user.admin && '(Administrator)' }</span>
            <span className={ classes.headerItem }>{ user.email }</span>
            <span  className={ classes.headerItem }>{ !user.admin ? `${ user.flights.length } total flights` : '<ADMIN>' }</span>
            <span className={ classes.headerItem }>{ user.weight || '?' }lbs</span>
        </div>

    );
};

export default User;
