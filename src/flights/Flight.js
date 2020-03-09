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
        fontWeight: 'bold',
        marginBottom: '0.5rem'
    },
    flex: {
        display: 'flex'
    },
    date: props => ({
        marginRight: '3rem',
        fontSize: '1rem',
        display: 'block',
        position: 'relative',
        width: '6em',
        height: '6em',
        backgroundColor: '#fff',
        borderRadius: '0.6em',
        overflow: 'hidden',
        borderBottom: '0.5px solid lightgrey',
        '& *': {
            display: 'block',
            width: '100%',
            fontSize: '1em',
            fontWeight: 'bold',
            fontStyle: 'normal',
            textAlign: 'center'
        },
        '& strong': {
            position: 'absolute',
            top: '0',
            padding: '0.2em 0',
            color: '#fff',
            backgroundColor: props.calColor || '#fd9f1b',
            borderBottom: '1px dashed #f37302',
            boxShadow: `0 2px 0 ${ props.calColor || '#fd9f1b' }`,
        },
        '& em': {
            position: 'absolute',
            bottom: '1.2em',
            color: props.calColor || '#fd9f1b'
        },
        '& span': {
            width: '100%',
            fontSize: '1.8em',
            letterSpacing: '-0.05em',
            paddingTop: '0.9em',
            color: '#2f2f2f',
        }
    }),
    subContainer: {
        display: 'flex'
    }
});

const Flight = ({ calColor, flight, showAll, user }) => {
    const date = moment(flight.flight_datetime);
    const isFull = flight.passengers.length === 4;
    const classes = styles({ isFull, calColor });
    return (
        <div className={ classes.container }>
            { isFull && <div className={ classes.flex }>This flight is full!</div> }
            <div className={ classes.subContainer }>
                <time className={ classes.date }>
                    <em>{ date.format('dddd') }</em>
                    <strong>{ date.format('MMMM') }</strong>
                    <span>{ date.format('DD') }</span>
                </time>
                <div>
                    <div className={ classes.title }>{ flight.origin } -> { flight.destination || 'TBD' }</div>
                    <span className={ classes.flex }>
                        With { showAll ?
                            flight.passengers.filter(p => !(p.email === user.email)).concat([{ name: 'Aaron' }]).reverse().map(p => p.name).join(', ') :
                            `Aaron and ${ flight.passengers.length } other(s)`}
                    </span>
                    { showAll && flight.cost && <div className={ classes.flex }>Cost: { flight.cost }</div>}
                </div>
            </div>
        </div>
    );
};

export default Flight;
