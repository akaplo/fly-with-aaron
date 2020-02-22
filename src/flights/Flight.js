import React from 'react';
import moment from 'moment';

const Flight = ({ flight }) => {
    const date = moment(flight.flight_date);
    return (
        <div>
            <div>On <b>{ date.format('dddd, MMMM Do') }</b> at { date.format('h:mm:ss a') }</div>
            <div>{ flight.origin } -> { flight.destination }</div>
            <span>Flight currently has { flight.passengers.map(p => p.name).join(', ') }</span>
            { flight.passengers.length === 4 && <span>This flight is full!</span> }
        </div>
    );
};

export default Flight;
