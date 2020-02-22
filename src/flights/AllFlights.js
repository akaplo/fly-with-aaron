import React, { Fragment, useEffect, useState } from 'react';
import { getFlightsForUser } from "../actions/actions";
import Flight from "./Flight";

const AllFlights = ({ userID }) => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getFlightsForUser(userID).then(flights => {
            setFlights(flights);
        });
    }, [userID]);
    return (
        <div>
            <span>All Past Flights:</span>
            { flights.filter(f => new Date(f.flight_date) < new Date()).map(f =>
                <Fragment>
                    <div>---------------------------------</div>
                    <Flight flight={f} showAll={true}/>
                </Fragment>
            ) }
            <hr/>
            <span>All Upcoming Flight(s)</span>
            { flights.filter(f => new Date(f.flight_date) > new Date()).map(f =>
                <Fragment>
                    <div>---------------------------------</div>
                    <Flight flight={ f } showAll={ true }/>
                </Fragment>

            ) }

        </div>
    );
};

export default AllFlights;
