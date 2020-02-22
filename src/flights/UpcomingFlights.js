import React, { useEffect, useState } from 'react';
import { getFlightsForUser } from "../actions/actions";
import Flight from "./Flight";

const UpcomingFlights = ({ userID }) => {
    const [flights, setFlights] = useState([]);
    const [pastFlights, setPastFlights] = useState([]);

    useEffect(() => {
        getFlightsForUser(userID).then(flights => {
            const futureFlights = flights.filter(f => new Date(f.flight_date) > new Date());
            const pastFlights = flights.filter(f => new Date(f.flight_date) < new Date());
            setFlights(futureFlights);
            setPastFlights(pastFlights);
        });
    }, [userID]);
    return (
        <div>
            <span>You have { flights.length } upcoming flight(s) with Aaron</span>
            { flights.map(f => <Flight flight={ f } showAll/>) }
            <br/><br/>
            <span>You have taken { pastFlights.length } flight(s) with Aaron</span>
        </div>
    );
};

export default UpcomingFlights;
