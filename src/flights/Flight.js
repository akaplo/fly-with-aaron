import React from 'react';
import moment from 'moment';

const Flight = ({ flight, showAll }) => {
    const date = moment(flight.flight_date);
    const isFuture = new Date(flight.flight_date) > new Date();
    return (
        <div>
            <div>On <b>{ date.format('dddd, MMMM Do') }</b> at { date.format('h:mm:ss a') }</div>
            <div>{ flight.origin } -> { flight.destination || 'TBD' }</div>
            <span>Flight { isFuture ? 'currently has' : 'had'} { flight.passengers.map(p => p.name).join(', ') }</span>
            { flight.passengers.length === 4 && <div>This flight is full!</div> }
            { showAll && flight.cost && <div>Cost: { flight.cost }</div>}
        </div>
    );
};

export default Flight;
