import React from 'react';
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    container: props => ({
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        fontStyle:  props.isFull ? 'italic' : 'normal',
        color: props.isFull ? 'grey' : 'black'
    }),
    title: {
        display: 'flex',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    date: {
        display: 'flex',
        fontStyle: 'italic'
    },
    flex: {
        display: 'flex'
    }
});

const Flight = ({ flight, showAll }) => {
    const date = moment(flight.flight_datetime);
    const isFull = flight.passengers.length === 4;
    const classes = styles({ isFull });
    return (
        <div className={ classes.container }>
            { isFull && <div className={ classes.flex }>This flight is full!</div> }
            <div className={ classes.title }>{ flight.origin } -> { flight.destination || 'TBD' }</div>
            <div className={ classes.date }>{ date.format('dddd, MMMM Do YYYY') }, { date.format('h:mm:ss a') }</div>

            <span className={ classes.flex }>With { showAll ? flight.passengers.map(p => p.name).join(', ') : `Aaron and ${ flight.passengers.length } other(s)`}</span>
            { showAll && flight.cost && <div className={ classes.flex }>Cost: { flight.cost }</div>}
        </div>
    );
};

export default Flight;
