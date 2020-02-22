import React, { useEffect, useState } from 'react';
import { Input } from "@material-ui/core";
import { getFlightsForUser } from "../actions/actions";
import moment from 'moment';

const UpcomingFlights = ({ userID }) => {
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        getFlightsForUser(userID).then(flights => {
            setFlights(flights);
        });
    }, [userID]);
    return (
        <div>
            <span>You have { flights.length } upcoming flights with Aaron</span>
            {
                flights.map(f => {
                    const date = moment(f.flight_date);
                    return <div>
                        <div>On <b>{ date.format('dddd, MMMM Do') }</b> at { date.format('h:mm:ss a') }</div>
                        <div>{ f.origin } -> { f.destination }</div>
                        <span>Flight currently has { f.passengers.map(p => p.name).join(', ') }</span>
                        { f.passengers.length === 4 && <span>This flight is full!</span> }
                    </div>
                })
            }
        </div>
    );
};

export default UpcomingFlights;
